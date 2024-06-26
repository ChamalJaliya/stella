// utils.ts
import { AccessoryItem, ClothingItem } from "@/app/api/pinecone/types";
import OpenAI from "openai";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const clothingItemSchema = z.object({
  itemId: z.string().optional(),
  category: z.literal("clothing"),
  color: z.array(z.string()).default([]),
  brand: z.string().default("Unknown"),
  style: z.array(z.string()).optional().default([]),
  additionalNotes: z.string(),
  subcategory: z.string().optional().default("Unknown"),
  pattern: z.string().optional().default("Unknown"),
  fabricMaterial: z.string(),
  fabricTexture: z.array(z.string()).optional().default([]),
  fabricTransparency: z
    .enum(["opaque", "sheer", "semi-sheer"])
    .optional()
    .default("opaque"),
  neckline: z.string().optional().default("Unknown"),
  closure: z.array(z.string()).optional().default([]),
  sleeveLength: z.string().optional().default("Unknown"),
  fit: z.array(z.string()).optional().default([]),
  embellishments: z.array(z.string()).optional().default([]),
  detailOther: z.array(z.string()).optional().default([]),
  occasion: z.array(z.string()).optional().default([]),
  season: z.array(z.string()).optional().default([]),
  size: z.string().optional().default("Unknown"),
  complementaryItems: z.array(z.string()).optional().default([]),
  personalRating: z.number().nullable().optional(),
});

const accessoryItemSchema = z.object({
  itemId: z.string().optional(),
  category: z.literal("accessory"),
  color: z.array(z.string()).default([]),
  brand: z.string().optional().default("Unknown"),
  style: z.array(z.string()).optional().default([]),
  additionalNotes: z.string(),
  type: z.array(z.string()).optional().default([]),
  material: z.string(),
  length: z.string().optional().default("Unknown"),
  gemstones: z.array(z.string()).optional().default([]),
  subcategory: z.string().optional().default("Unknown"),
});

// Example instances of your types for demonstration
const exampleClothingItem: ClothingItem = {
  itemId: "example-clothing-item-id",
  category: "clothing",
  color: ["red"],
  brand: "Example Brand",
  style: ["casual"],
  additionalNotes: "A comfortable cotton T-shirt.",
  subcategory: "top",
  pattern: "solid",
  fabricMaterial: "cotton",
  fabricTexture: ["soft"],
  fabricTransparency: "opaque",
  neckline: "crew neck",
  closure: [],
  sleeveLength: "short",
  fit: ["relaxed"],
  embellishments: [],
  detailOther: [],
  occasion: ["casual"],
  season: ["spring", "summer", "fall"],
  size: "M",
  complementaryItems: ["jeans", "shorts"],
  personalRating: 4,
};

const exampleAccessoryItem: AccessoryItem = {
  itemId: "example-accessory-item-id",
  category: "accessory",
  color: ["silver"],
  brand: "Example Brand",
  style: ["minimalist"],
  additionalNotes: "A simple silver chain necklace.",
  type: "necklace",
  material: "silver",
  length: "18 inches",
  gemstones: [],
  subcategory: "necklace",
};

export const entityExtractionWardrobePrompt = async (
  response: string
): Promise<(ClothingItem | AccessoryItem)[]> => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true, // Adjust if you're NOT in a browser environment
    });

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content:
          "You are a helpful assistant that parses clothing item data into a valid JSON array of ClothingItem or AccessoryItem objects.",
      },
      {
        role: "user",
        content: `You are a helpful assistant that parses clothing item data into a valid JSON array of ClothingItem or AccessoryItem objects. Follow these rules strictly:

1. Only extract the attributes defined in the type definitions.
2. If a value for any of the attributes is missing or unknown, fill it in with the string 'Unknown'.
3. If you are uncertain about the value of any attribute, err on the side of providing a default or general value that best fits the description rather than leaving it blank.
4. Do not include any additional text or commentary in your response; just the JSON array itself.:
      
      ${response}
      
      Example Formats:
      \`\`\`json
      ${JSON.stringify(exampleClothingItem, null, 2)}
      \`\`\`
      \`\`\`json
      ${JSON.stringify(exampleAccessoryItem, null, 2)}
      \`\`\``,
      },
    ];

    const encoder = new TextEncoder();
    const responseTokenCount = encoder.encode(response).length / 4;

    // 2. Calculate max_tokens, ensuring it's an integer
    const maxTokens = Math.max(
      1, // Minimum of 1 token allowed
      Math.floor(
        8192 - responseTokenCount - 500 // Round down to the nearest integer
      )
    );

    const parsingResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0,
      max_tokens: 4096, // Lower temperature for more deterministic results
    });

    // Parse and Validate OpenAI's response
    let parsedItems: (ClothingItem | AccessoryItem)[] = [];

    try {
      const rawResponse = parsingResponse.choices[0]?.message?.content;
      if (!rawResponse || typeof rawResponse !== "string") {
        throw new Error("Invalid response from OpenAI API.");
      }

      // Remove everything except the JSON array content
      const jsonMatch = rawResponse.match(/\[.*\]/s); // Match from first '[' to last ']' (single-line mode)
      if (!jsonMatch) {
        throw new Error("No valid JSON array found in the response.");
      }
      const jsonString = jsonMatch[0];

      parsedItems = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Error parsing LLM response:", parseError, parsingResponse);
      throw new Error("OpenAI response could not be parsed as valid JSON.");
    }

    // Apply default values for missing or empty attributes and handle type issues
    parsedItems = parsedItems.map((item: any) => ({
      ...item,
      itemId: uuidv4(), // Assign a unique ID to each item
      category: item.category === "clothing" ? "clothing" : "accessory",
      color: item.color || ["Unknown"],
      brand: item.brand || "Unknown",
      style: item.style || ["Unknown"],
      additionalNotes: item.additionalNotes || "Unknown", // Handle potentially empty additionalNotes
      subcategory: item.subcategory || "Unknown",
      pattern: item.pattern || "Unknown",
      fabricMaterial: item.fabricMaterial || "Unknown",
      fabricTexture: item.fabricTexture || ["Unknown"],
      fabricTransparency: item.fabricTransparency || "Unknown",
      neckline: item.neckline === "" ? "Unknown" : item.neckline, // Handle empty string
      closure: item.closure || ["Unknown"],
      sleeveLength: item.sleeveLength === "" ? "Unknown" : item.sleeveLength, // Handle empty string
      fit: item.fit || ["Unknown"],
      embellishments: item.embellishments || ["Unknown"],
      detailOther: item.detailOther || ["Unknown"],
      occasion: item.occasion || ["Unknown"],
      season: item.season || ["Unknown"],
      size: item.size === "" ? "Unknown" : item.size, // Handle empty string
      complementaryItems: item.complementaryItems || ["Unknown"],
      personalRating: item.personalRating || 0,
      material: item.material || "Unknown", // For AccessoryItem
      length: item.length || "Unknown", // For AccessoryItem
      gemstones: item.gemstones || ["Unknown"], // For AccessoryItem
    }));

    return parsedItems;
  } catch (error) {
    console.error("Error in entityExtractionWardrobePrompt:", error);
    throw new Error(
      "Failed to extract wardrobe item data. Please check your input and try again."
    );
  }
};
