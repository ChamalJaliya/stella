
import { AccessoryItem, ClothingItem } from "@/app/api/pinecone/types";
import OpenAI from "openai";
import { generateUUID } from "./generateUUID";


// OpenAI client
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
// System prompt to guide OpenAI's parsing
const systemPrompt = `You are an AI assistant helping to categorize fashion items. 
You'll be given a description of a clothing item or accessory. 
Your task is to extract relevant details and categorize it.

Desired format:

\`\`\`json
{
  "category": "clothing" | "accessory",
  "itemId": "unique_id", // Make this up 
  "type": (if accessory) "necklace" | "bracelet" | "ring" | "earring" | "glasses" | "watch",
  "subcategory": (if applicable) "tunic dress", "blazer", etc.,
  "color": ["color1", "color2"], // Can be multiple colors
  "pattern": "striped" | "floral" | "plaid" | etc.,
  "fabricMaterial": "silk" | "cotton" | "wool" | etc.,
  "fabricTexture": ["smooth", "textured"], // Can be multiple textures
  "fabricTransparency": "opaque" | "sheer" | "semi-sheer",
  "brand": "brand name",
  "style": ["casual", "formal"], // Can be multiple styles
  "neckline": (if clothing) "v-neck" | "crew neck" | etc.,
  "closure": (if clothing) ["button", "zipper"], // Can be multiple closures
  "sleeveLength": (if clothing) "long" | "short" | "sleeveless",
  "fit": (if clothing) ["relaxed", "fitted"], // Can be multiple fit types
  "embellishments": (if applicable) ["beads", "sequins"], // Can be multiple
  "detailOther": ["unique detail1", "unique detail2"], // Can be multiple
  "occasion": ["casual", "formal"], // Can be multiple occasions
  "season": ["spring", "summer"],  // Can be multiple seasons
  "size": "XS" | "S" | "M" | "L" | etc.,
  "complementaryItems": ["item_id1", "item_id2"], // IDs of items that go well with this one
  "personalRating": 1 | 2 | 3 | 4 | 5, // Your rating of the item
  "additionalNotes": "any other notes about the item"
}
\`\`\`
`;

// Function to parse a single item description
export async function parseItemDescription(
  description: string
): Promise<ClothingItem | AccessoryItem> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: description }
      ],
      temperature: 0.0, // Set to 0 for more deterministic output
    });

    const parsedItem = JSON.parse(completion.choices[0].message.content.trim()) as ClothingItem | AccessoryItem;

    // Ensure a unique itemId
    if (!parsedItem.itemId) {
      parsedItem.itemId = generateUUID();
    }

    return parsedItem;
  } catch (error) {
    console.error("Error parsing item description:", error, description);
    throw new Error("Failed to parse item description."); // Or handle the error differently
  }
}

// Function to parse the entire closet data string
export const parseClosetData = (inputData: string): Promise<(ClothingItem | AccessoryItem)[]> => {
  const itemDescriptions = inputData.split("\n\n"); // Split by empty lines
  return Promise.all(itemDescriptions.map(parseItemDescription));
};
