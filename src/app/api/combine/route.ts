"use server";

import { ReadableStream, TransformStream } from "node:stream/web";
import { type ResponseInit } from 'node-fetch'; 
import { StreamingTextResponse } from "ai";

import { POST as anthropicPOST } from "../anthropic/route";
import { POST as openaiPOST } from "../openai/route";
import { POST as geminiPOST } from "../gemini/route";
import { combineStreams } from "@/client/utils/combineStreams";


// Timeout for parallel requests (in milliseconds)
const PARALLEL_REQUEST_TIMEOUT = 10000; 


export async function POST(req: Request) {
    const { messages } = await req.json();
    const controller = new AbortController();
    let timeoutId: NodeJS.Timeout; // Declare timeoutId here

    try {
        // Parallel API calls with timeout
        const [anthropicResponse, openAIResponse, geminiResponse] = await Promise.allSettled([
            timeoutPromise(anthropicPOST(req), PARALLEL_REQUEST_TIMEOUT, "Anthropic"),
            timeoutPromise(openaiPOST(req), PARALLEL_REQUEST_TIMEOUT, "OpenAI"),
            timeoutPromise(geminiPOST(req), PARALLEL_REQUEST_TIMEOUT, "Gemini"),
        ]);
        
        // filter out rejected promises
        const validResponses = [anthropicResponse, openAIResponse, geminiResponse].filter((result) => result.status === "fulfilled") as PromiseFulfilledResult<Response>[];


        const validStreams = validResponses.map((response) => response.value.body as ReadableStream<any>); // Type assertion
        
        // Combine valid streams
        const combinedStream = combineStreams(...validStreams);

        // Convert the combined AsyncIterable to ReadableStream<Uint8Array>
        const readableCombinedStream = new ReadableStream({
            async start(controller) {
                for await (const chunk of combinedStream) {
                    controller.enqueue(new TextEncoder().encode(chunk));
                }
                controller.close();
            }
        });
        
        // Pipe through TextDecoderStream wrapped in a TransformStream
        const textStream = readableCombinedStream.pipeThrough(
            new TransformStream({
                transform(chunk, controller) {
                    controller.enqueue(new TextDecoder().decode(chunk));
                }
            })
        );

        const responseInit: ResponseInit = {
            headers: { "Content-Type": "text/event-stream" },
        };
        
        // Attach AbortController's signal to the response (Node.js 18+)
        if ('signal' in responseInit) {
            responseInit.signal = controller.signal;
        }

        return new StreamingTextResponse(textStream);
    } catch (error) {
        console.error('Combine Error:', error);

        // Check if the error is due to timeout
        if (error.name === 'AbortError') {
            return new Response('Request timed out', { status: 408 }); // HTTP 408 Request Timeout
        }

        return new Response('Error processing combined request', { status: 500 });
    } finally {
        clearTimeout(timeoutId); 
    }
}


async function timeoutPromise(promise: Promise<any>, ms: number, apiName: string) {
    return Promise.race([
        promise,
        new Promise((resolve, reject) => setTimeout(() => reject(new Error(`Request to ${apiName} timed out.`)), ms))
    ]);
}
