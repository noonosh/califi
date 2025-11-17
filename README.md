# Califi

A simple npm package that evaluates mathematical expressions using Large Language Models (OpenAI's GPT-4o-mini).

## Installation

```bash
npm install califi
```

## Setup

Before using Califi, you need to set up your OpenAI API key as an environment variable:

1. Get your API key from [OpenAI's platform](https://platform.openai.com/api-keys)
2. Set the environment variable:

```bash
export OPENAI_API_KEY='your-api-key-here'
```

Or create a `.env` file in your project root:

```env
OPENAI_API_KEY=your-api-key-here
```

If using a `.env` file, make sure to load it before using the package (e.g., with `dotenv`):

```javascript
require("dotenv").config();
```

## Usage

### Basic Example

```typescript
import { cf } from "califi";

async function main() {
  try {
    const result = await cf("2 + 2");
    console.log(result); // Output: "4"

    const result2 = await cf("sqrt(16) * 5");
    console.log(result2); // Output: "20"

    const result3 = await cf("What is 15% of 200?");
    console.log(result3); // Output: "30"
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
```

### JavaScript (CommonJS)

```javascript
const { cf } = require("califi");

cf("10 * 5")
  .then((result) => console.log(result)) // Output: "50"
  .catch((error) => console.error(error));
```

### TypeScript

```typescript
import { cf } from "califi";

const calculate = async (expression: string): Promise<string> => {
  return await cf(expression);
};

calculate("sin(pi/2)").then((result) => {
  console.log(result); // Output: "1"
});
```

## API Reference

### `cf(expression: string): Promise<string>`

Evaluates a mathematical expression using AI.

**Parameters:**

- `expression` (string): A mathematical expression to evaluate. Can be in natural language or standard mathematical notation.

**Returns:**

- `Promise<string>`: A promise that resolves to the numerical answer as a string.

**Throws:**

- `Error`: If the `OPENAI_API_KEY` environment variable is not set.
- `Error`: If the OpenAI API call fails.
- `Error`: If the API returns an invalid response.

**Examples:**

```typescript
await cf("2 + 2"); // "4"
await cf("sqrt(144)"); // "12"
await cf("What is 20% of 500?"); // "100"
await cf("(3 + 4) * (2 - 1)"); // "7"
```

**Note:** The function `evaluate` is also exported as an alias for backwards compatibility.

## Requirements

- Node.js 14 or higher
- An OpenAI API key with access to GPT-4o-mini

## Features

- ✅ Simple and intuitive API
- ✅ Supports natural language math queries
- ✅ Supports standard mathematical notation
- ✅ TypeScript support with full type definitions
- ✅ Comprehensive error handling
- ✅ Fully tested

## Future Enhancements

The package is designed to be extensible. Future versions will support:

- Multiple LLM providers (Anthropic, Google, etc.)
- Configuration options for model selection
- Custom system prompts
- Caching for repeated queries

## Error Handling

The package throws descriptive errors in the following cases:

1. **Missing API Key:**

```typescript
// Error: Missing OPENAI_API_KEY environment variable. Please set it before using this package.
```

2. **API Errors:**

```typescript
// Error: OpenAI API error (401): Incorrect API key provided
```

3. **Invalid Response:**

```typescript
// Error: Failed to get a valid response from OpenAI
```

## Testing

Run the test suite:

```bash
npm test
```

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.
