// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2834e3c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly handle the branch condition in asech for non-zero imaginary values", () => {
    const c = new Complex(0, 0.5);
    const result = c.asech();
    // The mutation changes (b !== 0) to (false), which should affect this case
    // where b is 0.5 (non-zero)
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeLessThan(0);
    // Verify the result is not NaN or Infinity
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});