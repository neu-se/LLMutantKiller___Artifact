// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-246ab6e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for negative values where the mutation would cause incorrect results", () => {
    // The mutation changes Math.exp(-x) to Math.exp(+x)
    // For negative x, this would incorrectly compute cosh
    const z = new Complex(-1, 0);
    const result = z.cosh();

    // Original: (Math.exp(-1) + Math.exp(1)) * 0.5
    // Mutated: (Math.exp(-1) + Math.exp(-1)) * 0.5 = Math.exp(-1)
    const originalExpected = (Math.exp(-1) + Math.exp(1)) * 0.5;
    const mutatedExpected = Math.exp(-1);

    // Should match original calculation
    expect(result.re).toBeCloseTo(originalExpected, 10);
    expect(result.re).not.toBeCloseTo(mutatedExpected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});