import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should return the correct result for the sech function with a real part of 1 and an imaginary part of 0", () => {
    const complex = new Complex(1, 0);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(0.6630376474389426);
    expect(result.im).toBeCloseTo(0);
  });
});