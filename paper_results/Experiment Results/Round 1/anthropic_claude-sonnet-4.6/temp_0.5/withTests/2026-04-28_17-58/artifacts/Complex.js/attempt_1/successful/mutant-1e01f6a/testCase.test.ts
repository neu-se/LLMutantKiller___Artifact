import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should return a negative imaginary part for atanh of a real number greater than 1", () => {
    const result = new Complex(2, 0).atanh();
    // For atanh(a) where a > 1, the imaginary part should be -π/2
    expect(result.re).toBeCloseTo(Math.log(3) / 2, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});