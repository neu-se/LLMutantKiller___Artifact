import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("atanh with real number greater than 1", () => {
  it("should return negative imaginary part for atanh(2)", () => {
    const result = new Complex(2, 0).atanh();
    // For atanh(2), noIM is true (a > 1 && b === 0)
    // The imaginary part should be negated: -π/2
    expect(result.re).toBeCloseTo(Math.log(3) / 2, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});