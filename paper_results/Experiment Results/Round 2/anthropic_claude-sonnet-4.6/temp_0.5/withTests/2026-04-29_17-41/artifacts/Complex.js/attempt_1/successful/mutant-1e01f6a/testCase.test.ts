import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should return correct imaginary part for atanh of real number greater than 1", () => {
    const result = new Complex(2, 0).atanh();
    // atanh(2) = ln(3)/2 - i*π/2 for real a > 1
    expect(result.re).toBeCloseTo(Math.log(3) / 2, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});