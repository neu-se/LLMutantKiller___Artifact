// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-92ea616/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot()", () => {
  it("should correctly handle non-zero complex numbers and expose the mutation", () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    // The mutation changes (d !== 0) to (d === 0)
    // For non-zero complex numbers, d will not be zero, so:
    // Original: takes first branch (d !== 0)
    // Mutated: takes second branch (d === 0)
    // This will produce different results
    expect(result.re).toBeCloseTo(0.4023594781, 6);
    expect(result.im).toBeCloseTo(-0.5535743588, 6);
  });
});