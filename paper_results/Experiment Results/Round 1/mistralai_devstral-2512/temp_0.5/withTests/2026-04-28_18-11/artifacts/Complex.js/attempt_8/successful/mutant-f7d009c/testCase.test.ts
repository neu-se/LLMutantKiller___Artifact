import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js hypot function mutation test", () => {
  it("should correctly handle the boundary case where b equals exactly 3000", () => {
    // Test with values that will expose the difference in calculation methods
    const c = new Complex(1, 3000);
    const absValue = c.abs();

    // Calculate what the precise method should give
    const preciseResult = 3000 * Math.sqrt(1 + (1/3000) * (1/3000));

    // The original code uses precise calculation when b >= 3000
    // The mutated code uses simple sqrt when b <= 3000
    // We need to verify the precise calculation is used
    expect(absValue).toBeCloseTo(preciseResult, 14);
  });
});