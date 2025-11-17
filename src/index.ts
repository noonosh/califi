import { evaluateMathExpression } from "./evaluator";

/**
 * Evaluates a mathematical expression using AI (OpenAI GPT-4o-mini)
 *
 * @param expression - A mathematical expression as a string (e.g., "2 + 2", "sqrt(16)", "sin(pi/2)")
 * @returns Promise that resolves to the numerical answer as a string
 * @throws Error if OPENAI_API_KEY is not set or if the API call fails
 *
 * @example
 * ```typescript
 * import { cf } from 'califi';
 *
 * const result = await cf('2 + 2');
 * console.log(result); // "4"
 * ```
 */
export async function cf(expression: string): Promise<string> {
  return evaluateMathExpression(expression);
}

// Alias for backwards compatibility
export { cf as evaluate };

// Also export the evaluator function for advanced use cases
export { evaluateMathExpression } from "./evaluator";
