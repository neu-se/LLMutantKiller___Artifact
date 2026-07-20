import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should throw an error or return NaN when calculating atan for a complex number with real part 0 and imaginary part 1 in the mutated code", () => {
    const complexNumber = new Complex(0, 1);
    const result = complexNumber.atan();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});