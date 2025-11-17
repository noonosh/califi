import OpenAI from "openai";

/**
 * Evaluates a mathematical expression using OpenAI's GPT-4o-mini model
 * @param expression - The mathematical expression to evaluate
 * @returns The numerical answer as a string
 * @throws Error if API key is missing, API call fails, or response is invalid
 */
export async function evaluateMathExpression(
  expression: string
): Promise<string> {
  // Check for API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing OPENAI_API_KEY environment variable. Please set it before using this package."
    );
  }

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: apiKey,
  });

  try {
    // Make API call to OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a mathematical calculator. When given a mathematical expression, evaluate it and return ONLY the numerical answer. Do not include any explanation, units, or additional text - just the number.",
        },
        {
          role: "user",
          content: expression,
        },
      ],
      temperature: 0, // Use deterministic output
      max_tokens: 100, // Limit response size since we only need a number
    });

    // Extract the answer
    const answer = completion.choices[0]?.message?.content?.trim();

    if (!answer) {
      throw new Error("Failed to get a valid response from OpenAI");
    }

    return answer;
  } catch (error) {
    // Re-throw with more context if it's an API error
    if (error instanceof OpenAI.APIError) {
      throw new Error(`OpenAI API error (${error.status}): ${error.message}`);
    }

    // Re-throw other errors as-is
    throw error;
  }
}
