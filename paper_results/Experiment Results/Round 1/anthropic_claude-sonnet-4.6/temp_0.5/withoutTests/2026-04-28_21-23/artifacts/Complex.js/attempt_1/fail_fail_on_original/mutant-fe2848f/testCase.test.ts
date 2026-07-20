import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should compute atanh(-2) with correct imaginary part sign", () => {
    // For a = -2, b = 0:
    // Original: noIM = (-2 > 1) && (0 === 0) = false => imaginary not negated
    // Mutated:  noIM = (-2 > 1) || (0 === 0) = true  => imaginary negated
    const result = new Complex(-2, 0).atanh();
    // atanh(-2) should have imaginary part = -PI/2
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    expect(result.re).toBeCloseTo(Math.log(3) / 2 * -1, 10);
  });
});