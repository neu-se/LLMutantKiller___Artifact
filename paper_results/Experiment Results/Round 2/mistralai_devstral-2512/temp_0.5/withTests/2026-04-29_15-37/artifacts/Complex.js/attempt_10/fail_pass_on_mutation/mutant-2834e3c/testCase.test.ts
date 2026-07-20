// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2834e3c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly handle the ternary condition for non-zero imaginary values", () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    // The mutation changes (b !== 0) to (false), which should cause this test to fail
    // because it will incorrectly use -b/0 instead of the proper calculation
    expect(result.re).toBeCloseTo(0.881373587019543, 10);
    expect(result.im).toBeCloseTo(-1.5707963267948966, 10);
    // Additional check to ensure we're not getting Infinity from the mutated branch
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(-Infinity);
  });
});