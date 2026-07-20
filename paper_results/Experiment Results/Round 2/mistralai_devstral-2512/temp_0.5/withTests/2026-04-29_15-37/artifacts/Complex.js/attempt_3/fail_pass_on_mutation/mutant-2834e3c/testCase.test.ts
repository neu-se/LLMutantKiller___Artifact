// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2834e3c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should handle non-zero imaginary part correctly", () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    expect(result.isNaN()).toBe(false);
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeLessThan(0);
  });
});