import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js hypot function mutation test", () => {
  it("should correctly handle boundary case where b equals 3000", () => {
    // Test with values that would show different behavior between the two implementations
    const c = new Complex(1, 3000);
    const absValue = c.abs();

    // Calculate both possible results
    const simpleResult = Math.sqrt(1 * 1 + 3000 * 3000);
    const preciseResult = 3000 * Math.sqrt(1 + (1/3000) * (1/3000));

    // The original code should use precise calculation (b >= 3000)
    // The mutated code would use simple sqrt (b <= 3000)
    // These should be different enough to detect the mutation
    expect(absValue).toBeCloseTo(preciseResult, 10);
    expect(absValue).not.toBeCloseTo(simpleResult, 10);
  });
});