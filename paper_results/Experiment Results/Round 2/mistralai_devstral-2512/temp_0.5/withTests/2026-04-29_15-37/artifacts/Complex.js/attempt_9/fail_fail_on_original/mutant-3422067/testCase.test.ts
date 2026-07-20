// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3422067/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function edge case", () => {
  it("should correctly handle the boundary case where a equals b in hypot calculation", () => {
    // Test with values that will trigger different calculation paths
    const c = new Complex(3001, 3001);
    const absValue = c.abs();
    // The original code uses Math.sqrt(a*a + b*b) when a >= b
    // The mutated code will use the else branch when a == b
    // We need to test with values where the two calculation methods produce different results
    const expectedOriginal = Math.sqrt(3001 * 3001 + 3001 * 3001);
    // Calculate what the mutated version would produce
    const a = 3001;
    const b = 3001;
    const mutatedResult = a * Math.sqrt(1 + (b/a) * (b/a));
    // The test should pass on original (using first calculation)
    // and fail on mutated (using second calculation)
    expect(absValue).toBeCloseTo(expectedOriginal, 10);
    expect(absValue).not.toBeCloseTo(mutatedResult, 10);
  });
});