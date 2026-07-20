// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-1a0e683/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.pow", () => {
  it("should handle zero base with zero imaginary part and positive real exponent correctly", () => {
    const base = new Complex(0, 0);
    const exponent = new Complex(2, 0);
    const result = base.pow(exponent);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});