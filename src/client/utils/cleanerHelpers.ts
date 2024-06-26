// --- Helper Functions ---
export const cleanupResponse = (endpoint: string, output: string): string => {
  let cleanedOutput = output.replace(/\d+:/g, "").replace(/\\n/g, "\n");

  switch (endpoint) {
    case "/api/gemini":
      cleanedOutput = cleanedOutput.replace(/##/g, "").trim();
      break;
    case "/api/openai":
      cleanedOutput = cleanedOutput
        .replace(/#/g, "")
        .replace(/\s+/g, " ")
        .replace(/"(?=[A-Za-z])/g, "") // Remove quotes before letters
        .replace(/(?<=[A-Za-z])"/g, "") // Remove quotes after letters
        .trim();
      break;
    // Add cases for other endpoints as needed
  }

  return cleanedOutput.trim();
};

export const parseJsonResponse = (output: string): string | null => {
  try {
    const parsedOutput = JSON.parse(output);
    if (
      typeof parsedOutput === "object" &&
      parsedOutput !== null &&
      "choices" in parsedOutput &&
      Array.isArray(parsedOutput.choices) &&
      parsedOutput.choices.length > 0 &&
      "message" in parsedOutput.choices[0] &&
      "content" in parsedOutput.choices[0].message
    ) {
      return parsedOutput.choices[0].message.content;
    }
  } catch (parseError) {
    console.error("Error parsing JSON response:", parseError);
  }

  return null; // Return null if parsing fails or the structure is unexpected
};
