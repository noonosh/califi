import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cf, evaluateMathExpression } from "../src/index";
import OpenAI from "openai";

// Mock the OpenAI module
vi.mock("openai");

describe("Math Expression Evaluator", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset environment variables before each test
    process.env = { ...originalEnv };
    process.env.OPENAI_API_KEY = "test-api-key";
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe("cf", () => {
    it("should evaluate a simple addition expression", async () => {
      // Mock the OpenAI response
      const mockCreate = vi.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: "4",
            },
          },
        ],
      });

      (OpenAI as any).mockImplementation(function (this: any) {
        this.chat = {
          completions: {
            create: mockCreate,
          },
        };
      });

      const result = await cf("2 + 2");

      expect(result).toBe("4");
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          model: "gpt-4o-mini",
          messages: expect.arrayContaining([
            expect.objectContaining({ role: "system" }),
            expect.objectContaining({ role: "user", content: "2 + 2" }),
          ]),
        })
      );
    });

    it("should evaluate a multiplication expression", async () => {
      const mockCreate = vi.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: "50",
            },
          },
        ],
      });

      (OpenAI as any).mockImplementation(function (this: any) {
        this.chat = {
          completions: {
            create: mockCreate,
          },
        };
      });

      const result = await cf("10 * 5");

      expect(result).toBe("50");
    });

    it("should evaluate a complex expression", async () => {
      const mockCreate = vi.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: "4",
            },
          },
        ],
      });

      (OpenAI as any).mockImplementation(function (this: any) {
        this.chat = {
          completions: {
            create: mockCreate,
          },
        };
      });

      const result = await cf("sqrt(16)");

      expect(result).toBe("4");
    });

    it("should throw an error when OPENAI_API_KEY is missing", async () => {
      delete process.env.OPENAI_API_KEY;

      await expect(cf("2 + 2")).rejects.toThrow(
        "Missing OPENAI_API_KEY environment variable"
      );
    });

    it("should throw an error when API response is empty", async () => {
      const mockCreate = vi.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: null,
            },
          },
        ],
      });

      (OpenAI as any).mockImplementation(function (this: any) {
        this.chat = {
          completions: {
            create: mockCreate,
          },
        };
      });

      await expect(cf("2 + 2")).rejects.toThrow(
        "Failed to get a valid response from OpenAI"
      );
    });

    it("should handle OpenAI API errors", async () => {
      const apiError = new OpenAI.APIError(
        401,
        { error: { message: "Invalid API key" } },
        "Invalid API key",
        new Headers()
      );

      const mockCreate = vi.fn().mockRejectedValue(apiError);

      (OpenAI as any).mockImplementation(function (this: any) {
        this.chat = {
          completions: {
            create: mockCreate,
          },
        };
      });

      await expect(cf("2 + 2")).rejects.toThrow(/OpenAI API error/);
    });
  });

  describe("evaluateMathExpression", () => {
    it("should be exported and work the same as evaluate", async () => {
      const mockCreate = vi.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: "100",
            },
          },
        ],
      });

      (OpenAI as any).mockImplementation(function (this: any) {
        this.chat = {
          completions: {
            create: mockCreate,
          },
        };
      });

      const result = await evaluateMathExpression("10 * 10");

      expect(result).toBe("100");
    });
  });
});
