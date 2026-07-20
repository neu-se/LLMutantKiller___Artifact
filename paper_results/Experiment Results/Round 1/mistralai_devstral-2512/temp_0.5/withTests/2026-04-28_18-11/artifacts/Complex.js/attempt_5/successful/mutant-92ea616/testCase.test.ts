// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-92ea616/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot()", () => {
  it("should correctly compute acot for non-zero complex number and expose mutation", () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    // The mutation changes (d !== 0) to (d === 0)
    // For non-zero complex numbers, d will not be zero
    // Original code takes first branch, mutated takes second branch
    // We need to verify the actual behavior rather than specific values
    // Check that result is finite (original) vs potentially infinite (mutated)
    expect(Number.isFinite(result.re)).toBe(true);
    expect(Number.isFinite(result.im)).toBe(true);
    // Also check the result is not NaN
    expect(!isNaN(result.re)).toBe(true);
    expect(!isNaN(result.im)).toBe(true);
  });
});