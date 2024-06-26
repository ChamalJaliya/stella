import {
  Pinecone,
  PineconeRecord,
  QueryOptions,
} from "@pinecone-database/pinecone";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ClothingItem, AccessoryItem, FilterOption } from "./types";
import { entityExtractionWardrobePrompt } from "@/client/prompts/entityExtractionWardrobePrompt";
import { chunkWardrobeData } from "@/client/utils/chunkHelper";
import { toStartCase } from "@/client/utils/textHelpers";

const pinecone = new Pinecone({
  apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
});
const INDEX_NAME = process.env.NEXT_PUBLIC_PINECONE_INDEX_NAME;

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

type PineconeRecordWithMetadata<T> = PineconeRecord<{ [key: string]: any } & T>;
const MAX_CHUNK_SIZE = 2000;

export async function POST(request: Request) {
  try {
    const { method, data, sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const namespace = `user_session_${sessionId}`;
    const index = pinecone.Index(INDEX_NAME).namespace(namespace);
    const indexF = pinecone.Index(INDEX_NAME);
    let parsedItems: (ClothingItem | AccessoryItem)[] = [];

    if (method === "upsert") {
      const chunks = chunkWardrobeData(data, MAX_CHUNK_SIZE);

      for (const chunk of chunks) {
        const items = await entityExtractionWardrobePrompt(chunk);
        parsedItems.push(...items);
      }

      // Generate embeddings and upsert to Pinecone
      const batchSize = 500; // Choose an appropriate batch size
      for (let i = 0; i < parsedItems.length; i += batchSize) {
        const batch = parsedItems.slice(i, i + batchSize);
        const vectors = await Promise.all(
          batch.map(async (item: ClothingItem | AccessoryItem) => {
            const embeddingResponse = await openai.embeddings.create({
              model: "text-embedding-ada-002",
              input: item.additionalNotes,
            });
            const embedding = embeddingResponse.data[0].embedding;
            const record: PineconeRecordWithMetadata<
              ClothingItem | AccessoryItem
            > = {
              id: item.itemId,
              values: embedding,
              metadata: item,
            };
            return record;
          })
        );
        console.log("Upserting vectors:", vectors);
        try {
          await index.upsert(vectors);
        } catch (upsertError: any) {
          console.error("Pinecone upsert error:", upsertError);
          return NextResponse.json(
            {
              error:
                upsertError.message ||
                "An error occurred while upserting to Pinecone.",
            },
            { status: 500 }
          ); // Internal Server Error for Pinecone issues
        }
      }

      return NextResponse.json(
        {
          message: `${parsedItems.length} items upserted to Pinecone successfully.`,
        },
        {
          status: 200,
          headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
        } // Adjust the origin
      );
    } else if (method === "fetchFilterOptions") {
      const dummyVector = new Array(1536).fill(0);

      const aggregationResponse = await index.query({
        topK: 10000,
        includeMetadata: true,
        vector: dummyVector,
      });

      const allItems = aggregationResponse.matches.map(
        (match) => match.metadata as ClothingItem | AccessoryItem
      );

      const categoryOptions: FilterOption[] = Array.from(
        new Set(allItems.map((item) => item.category))
      ).map((category) => ({ value: category, label: toStartCase(category) }));

      const colorOptions: FilterOption[] = Array.from(
        new Set(allItems.flatMap((item) => item.color || []))
      ).map((color) => ({ value: color, label: toStartCase(color) }));

      const styleOptions: FilterOption[] = Array.from(
        new Set(allItems.flatMap((item) => item.style || []))
      ).map((style) => ({ value: style, label: toStartCase(style) }));

      // Prepend the "All Categories", "All Colors", "All Styles" options
      categoryOptions.unshift({ value: "", label: "All Categories" });
      colorOptions.unshift({ value: "", label: "All Colors" });
      styleOptions.unshift({ value: "", label: "All Styles" });

      return NextResponse.json({
        categoryOptions,
        colorOptions,
        styleOptions,
      });
    } else if (method === "query") {
      let { query, filter } = data;
      let topK = query?.length || 5;
      // Handle empty query: Use an empty vector to fetch all items
      if (!query || query.trim() === "") {
        query = ""; // Explicitly set to empty string for clarity
      }

      // Generate embedding (even for empty query) to maintain consistent format
      const queryEmbedding = query
        ? await openai.embeddings
            .create({ model: "text-embedding-ada-002", input: query })
            .then((r) => r.data[0].embedding)
        : []; // Empty embedding for empty query

      // Handle empty or missing filter:  Fetch all if no filter provided
      filter = filter || undefined; // Explicitly set to undefined if empty/missing

      const queryResponse = await index.query({
        topK: query ? topK : 10000, // Adjust if you expect more than 10,000 items
        includeMetadata: true,
        vector: queryEmbedding,
        filter,
      });

      return NextResponse.json(queryResponse);
    } else if (method === "delete") {
      // Check if 'data' is 'all' (to delete all) or an array of IDs
      if (data === "all") {
        // Delete all vectors in the default namespace
        await index.deleteAll();
        return NextResponse.json(
          {
            message:
              "All vectors in the default namespace deleted successfully",
          },
          { status: 200 }
        );
      } else if (
        Array.isArray(data) &&
        data.every((item) => typeof item === "string")
      ) {
        // Delete specific vectors by ID (no change here)
        const idsToDelete: string[] = data;
        await index.deleteAll();
        return NextResponse.json(
          { message: "Vectors deleted successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            error:
              "Invalid data format for deletion. Please provide 'all' to delete all vectors or an array of item IDs.",
          },
          { status: 400 }
        );
      }
    } else if (method === "fetchWardrobeEmbeddings") {
      let { query: originalQuery } = data; // Get the original query
      let topK = 10000;

      let queryToSend = originalQuery; // Create a new variable to work with
      if (!queryToSend || queryToSend.trim() === "") {
        queryToSend = "";
      }

      // Use queryToSend in your Pinecone query
      const queryEmbedding = queryToSend
        ? await openai.embeddings
            .create({ model: "text-embedding-ada-002", input: queryToSend })
            .then((r) => r.data[0].embedding)
        : [];
      const queryResponse = await index.query({
        topK,
        includeValues: true,
        includeMetadata: true,
        vector: queryEmbedding,
      });
      const wardrobeItems = queryResponse.matches.map(
        (match) => match.metadata as ClothingItem | AccessoryItem
      );

      return NextResponse.json(wardrobeItems);

      // const wardrobeEmbeddings = queryResponse.matches.map((match) => ({
      //   itemId: match.id,
      //   embedding: match.values,
      // }));
    } else {
      return NextResponse.json({ error: "Invalid method" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Error in /api/pinecone:", error);
    if (error.response && error.response.status) {
      // If it's a Pinecone API error, return the status code
      return NextResponse.json(
        { error: error.message },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
