import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should return a value when calculating atan for a complex number with real part 0 and imaginary part 1", () => {
    const complexNumber = new Complex(0, 1);
    const result = complexNumber.atan();
    expect(result).toBeDefined();
  });
});