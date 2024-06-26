import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function POST(request: Request) {
  const { messages } = await request.json();
  
  const stream= true

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
    stream: stream === true,
  });

  if (stream) {
    const stream = OpenAIStream(response as any);
    return new StreamingTextResponse(stream);
  } else {

    let fullText = "";

    if (Symbol.asyncIterator in response) {
      for await (const part of response) {
        fullText += part.choices[0].delta?.content || "";
      }
    } else {
      fullText = response.choices[0].message.content;
    }
    // Apply cleanup only to OpenAI's non-streaming response
    fullText = fullText
      .replace(/\d+:"/g, "")
      .replace(/\\n/g, "\n")
      .replace(/#/g, "")
      .replace(/\s+/g, " ")
      .replace(/"(?=[A-Za-z])/g, "")
      .replace(/(?<=[A-Za-z])"/g, "")
      .trim();

    return new Response(fullText, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
