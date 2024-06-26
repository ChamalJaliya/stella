"use client"; // This is a Client Component

import { useState } from "react";
import { AccessoryItem, ClothingItem } from "../api/pinecone/types";
import { PineconeRecord } from "@pinecone-database/pinecone";
import { CircularProgress } from "@mui/material";

export interface PineconeResult {
  matches: PineconeRecord<ClothingItem | AccessoryItem>[];
}

const Pinecone: React.FC = () => {
  const [results, setResults] = useState<PineconeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [upsertMessage, setUpsertMessage] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    style: "",
  });

  const handleUpsert = async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    setUpsertMessage(null); // Clear the previous upsert message

    const clothingItems: ClothingItem[] = [
      {
        itemId: "blouse_cream_silk",
        category: "clothing",
        subcategory: "blouse",
        color: ["cream"],
        pattern: "",
        fabricMaterial: "silk",
        fabricTexture: ["lightweight"],
        fabricTransparency: "opaque",
        brand: "",
        style: ["elegant"],
        neckline: "high collar",
        closure: ["tie"],
        sleeveLength: "long",
        fit: ["relaxed"],
        embellishments: [],
        detailOther: ["voluminous sleeves"],
        occasion: ["formal", "casual"],
        season: ["spring", "summer"],
        size: "unknown",
        complementaryItems: [],
        personalRating: 0,
        additionalNotes:
          "This elegant blouse features a high collar with a tie closure and long, voluminous sleeves. The fabric appears to be lightweight and drapes beautifully.",
      },
      {
        itemId: "blouse_white_silk",
        category: "clothing",
        subcategory: "blouse",
        color: ["white"],
        pattern: "",
        fabricMaterial: "silk",
        fabricTexture: ["smooth"],
        fabricTransparency: "opaque",
        brand: "",
        style: ["classic"],
        neckline: "Mandarin collar",
        closure: ["button-front"],
        sleeveLength: "long",
        fit: ["relaxed"],
        embellishments: [],
        detailOther: ["subtle sheen"],
        occasion: ["formal", "casual"],
        season: ["spring", "summer"],
        size: "unknown",
        complementaryItems: [],
        personalRating: 0,
        additionalNotes:
          "This classic blouse has a Mandarin collar and a button-front closure. The silk fabric has a subtle sheen, giving it a luxurious look.",
      },
    ];

    try {
      const response = await fetch("/api/pinecone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: "upsert", data: clothingItems }), // Send the array of items
      });

      if (!response.ok) {
        throw new Error(`Error upserting to Pinecone: ${response.statusText}`);
      }

      const data = await response.json();
      setUpsertMessage(data.message);
    } catch (err) {
      setError("An error occurred while adding the items.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/pinecone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "query",
          data: { query, filter: filters },
        }),
      });

      if (!response.ok) {
        throw new Error("Error querying Pinecone");
      }

      const data = (await response.json()) as PineconeResult;
      setResults(data);
    } catch (err) {
      setError("An error occurred while querying.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Closet</h1>

      {/* Upsert Button */}
      <button
        onClick={handleUpsert}
        disabled={isLoading}
        className="bg-green-500 text-white p-2 rounded-md mt-4"
      >
        {isLoading ? "Adding..." : "Add Sample Blouse"}
      </button>

      {upsertMessage && <p className="text-green-500 mt-2">{upsertMessage}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <h1 className="text-3xl font-bold mb-4">Search Your Closet</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query (e.g., 'red dress')"
          className="p-2 border rounded-md"
        />

        <div className="flex space-x-2">
          {/* Filter by Category */}
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">All Categories</option>
            <option value="clothing">Clothing</option>
            <option value="accessory">Accessory</option>
          </select>

          {/* Filter by Color */}
          <input
            type="text"
            value={filters.color}
            onChange={(e) => handleFilterChange("color", e.target.value)}
            placeholder="Filter by color"
            className="p-2 border rounded-md"
          />

          {/* Filter by Style */}
          <input
            type="text"
            value={filters.style}
            onChange={(e) => handleFilterChange("style", e.target.value)}
            placeholder="Filter by style"
            className="p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>


      {isLoading && (
        <div className="mt-4">
          <p>Searching...</p>
          <CircularProgress />
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {results && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Results:</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.matches.map((match) => (
              <li key={match.id} className="border rounded-md p-4">
                <h3>
                  {match.metadata.category}: {match.metadata.brand}
                </h3>
                <p>{match.metadata.additionalNotes}</p>
                {/* Display other metadata as needed (images, details, etc.) */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default Pinecone;
