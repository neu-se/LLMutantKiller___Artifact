// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-dd8276f/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acsc()", () => {
  it("should handle zero imaginary part correctly", () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    expect(result.isInfinite()).toBe(true);
  });
});