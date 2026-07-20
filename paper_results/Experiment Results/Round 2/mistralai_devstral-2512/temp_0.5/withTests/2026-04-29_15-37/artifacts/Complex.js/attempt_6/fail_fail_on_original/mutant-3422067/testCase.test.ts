// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3422067/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function edge case", () => {
  it("should produce different results when a equals b in the boundary condition", () => {
    // Test with values that will trigger different calculation paths
    const c = new Complex(3001, 3001);
    const absValue = c.abs();
    // The original code uses Math.sqrt(a*a + b*b) when a >= b
    // The mutated code will use the else branch when a == b, which uses a different formula
    // This should produce noticeably different results
    const expectedOriginal = Math.sqrt(3001 * 3001 + 3001 * 3001);
    const expectedMutated = 3001 * Math.sqrt(1 + (3001/3001) * (3001/3001));
    // The test should pass on original (using first calculation)
    // and fail on mutated (using second calculation)
    expect(absValue).toBeCloseTo(expectedOriginal);
    expect(absValue).not.toBeCloseTo(expectedMutated);
  });
});