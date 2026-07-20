import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly compute atanh for a real number greater than 1", () => {
    const result = new Complex(2, 0).atanh();
    // For x > 1, atanh(x) should return a complex number with real part 0 and imaginary part -π/2
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});