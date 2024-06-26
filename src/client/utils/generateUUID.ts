import { randomUUID } from "crypto"; // Use Node.js built-in crypto module


// Function to generate a unique ID for an item
export const generateUUID = (): string => {
    return randomUUID();
};