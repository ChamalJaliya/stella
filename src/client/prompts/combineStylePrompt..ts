// /api/utils.ts

export const combineStylePrompt = (
  celebrityName: string,
  LLMOutputs: (string | { choices: { message: { content: string } }[] })[] // Union type for responses
): string => {
  // 1. Extract and Clean LLM Outputs
  const cleanedLLMOutputs = LLMOutputs.map((output) => {
    if (typeof output === "string") {
      return output; // If it's already a string, no change needed
    } else if (output.hasOwnProperty("choices")) {
      return output.choices[0].message.content; // Extract content from the object
    } else {
      throw new Error("Invalid LLM output format"); // Handle unexpected format
    }
  }).map(output => 
    output
      .replace(/\\n/g, ' ')       // Remove newline characters
      .replace(/^(\d+:|\*|-)/gm, '') // Remove list markers (e.g., "1:", "-", "*")
      .replace(/\s+/g, ' ')       // Replace multiple spaces with single spaces
      .replace(/\.+/g, '.')       // Replace multiple periods with a single period
      .replace(/,\s*,/g, ',')    // Remove extra commas
      .replace(/["#]/g, '')      // Remove quotes and hash symbols
      .replace(/(\w+)-(\w+)/g, '$1$2') // Merge hyphenated words
  );


  // 2. Construct LLM Output String for Prompt
  const llmOutputString = cleanedLLMOutputs
    .map((output, index) => `LLM Model ${index + 1}: ${output.trim()}`)
    .join('\n\n');

  return `Your assignment is to combine the following LLM outputs into a single combined output that includes unique information from each original LLM output. Generate a final combined output in our corporate style and tone by following the template and leveraging information you learn from the ${LLMOutputs.length} LLM model outputs provided. Detail is important for this assignment.

LLM Outputs: 
${llmOutputString}

Template to Follow:
${celebrityName}'s fashion style is a masterful blend of [adjective 1], [adjective 2], and [adjective 3], making [him/her] a true icon in the fashion world. [His/Her] style choices reflect [his/her] personality—[personality trait 1], [personality trait 2], and always with a touch of [personality trait 3]. Here's a comprehensive analysis of [his/her] fashion elements, signature looks, and preferred brands:

Key Elements of ${celebrityName}'s Style:
[Color Palette]: ${celebrityName} often chooses a palette of [color 1], [color 2], [color 3], and [color 4], which not only complement [his/her] complexion but also create a [adjective] and [adjective] foundation for [his/her] outfits.
[Style Adjective] [Style Noun]: [He/She] embraces [style element 1], [style element 2], and [style element 3], favoring a [style approach] that emphasizes [his/her] [physical attribute].
[Clothing Type]: Whether it's [occasion 1] or [occasion 2], ${celebrityName}'s clothing is often [adjective], showcasing [silhouette type] that highlight [his/her] [physical attribute].
[Fabric Type]: [He/She] opts for [fabric 1], [fabric 2], and [fabric 3], adding a touch of [adjective] and [adjective] to [his/her] style.
[Embellishment Type]: ${celebrityName} prefers outfits with [embellishment description], allowing [his/her] [adjective] [style noun] to shine through without unnecessary distractions.

Signature Looks:
[Occasion 1]: ${celebrityName} is renowned for [his/her] [adjective] appearances in [clothing type], often featuring [style element 1], [style element 2], and [style element 3], making [him/her] a constant figure of [style noun] on [occasion 1].
[Occasion 2]: [He/She] often sports [clothing type], reflecting [his/her] [personality trait 1], [personality trait 2] persona. These are frequently seen in [color/pattern], blending [style 1] and [style 2] seamlessly.
[Occasion 3]: Off-duty, [his/her] style includes [clothing item 1] paired with [clothing item 2] or [clothing item 3], topped with [clothing item 4] or [clothing item 5], embodying a [adjective 1] yet [adjective 2] aesthetic.
[Occasion 4]: In [his/her] role as [specific role], ${celebrityName} opts for more [adjective], [adjective] attire that is both [adjective] and aligned with [his/her] overall [style adjective] aesthetic.

Preferred Brands and Designers:
[Brand 1]: Known for [his/her] long-standing relationship with [Brand 1], ${celebrityName} often chooses their [clothing type] for their [brand characteristic 1] and [brand characteristic 2].
[Brand 2]: [He/She] frequently wears [Brand 2] for their [brand characteristic 1] and [brand characteristic 2], particularly their [clothing type 1] and [clothing type 2].
[Brand 3]: ${celebrityName} turns to [Brand 3] for [clothing type] that combine [brand characteristic 1] with [brand characteristic 2].
[Brand 4] and [Brand 5]: These designers are favored for their commitment to [brand value 1] and [brand value 2], aligning with ${celebrityName}'s [personal value] values.
[Brand 6] and [Brand 7]: These brands are selected for important events, reflecting [his/her] [adjective] taste in both [occasion 1] and [occasion 2] wear.

${celebrityName}'s fashion choices not only highlight [his/her] status as a style icon but also [his/her] commitment to [personal value 1], [personal value 2], and [personal value 3]. [His/Her] ability to maintain a distinctive and consistent aesthetic while adapting [his/her] wardrobe to various roles and responsibilities showcases [his/her] exceptional taste and influence in the fashion world.`;
};
