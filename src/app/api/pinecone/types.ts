import { RecordMetadataValue } from "@pinecone-database/pinecone";

interface ItemData {
  itemId: string;
  category: string; 
  color: string[];
  brand: string;
  style: string[]; 
  additionalNotes: string;
  [key: string]: RecordMetadataValue; // Index signature
}

export interface ClothingItem extends ItemData {
  subcategory: string;
  pattern: string;
  fabricMaterial: string;
  fabricTexture: string[];
  fabricTransparency: "opaque" | "sheer" | "semi-sheer"; 
  neckline: string;
  closure: string[];
  sleeveLength: string;
  fit: string[];
  embellishments: string[];
  detailOther: string[]; 
  occasion: string[]; 
  season: string[]; 
  size: string; 
  complementaryItems: string[]; 
  personalRating: number; 
}

export interface AccessoryItem extends ItemData {
  type: "necklace" | "bracelet" | "ring" | "earring" | "glasses" | "watch";
  material: string; 
  length: string; 
  gemstones: string[]; 
  subcategory: string;
}

export interface FilterOption {
  value: string;
  label: string;
}