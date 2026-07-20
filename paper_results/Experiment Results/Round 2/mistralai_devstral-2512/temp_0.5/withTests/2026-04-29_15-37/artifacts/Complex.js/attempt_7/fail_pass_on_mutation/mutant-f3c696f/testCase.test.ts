import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot()", () => {
  it("should return correct imaginary part sign for pure imaginary inputs", () => {
    const positiveImaginary = new Complex(0, 1);
    const negativeImaginary = new Complex(0, -1);

    const resultPos = positiveImaginary.acot();
    const resultNeg = negativeImaginary.acot();

    expect(resultPos.im).toBe(-Infinity);
    expect(resultNeg.im).toBe(Infinity);
  });
});