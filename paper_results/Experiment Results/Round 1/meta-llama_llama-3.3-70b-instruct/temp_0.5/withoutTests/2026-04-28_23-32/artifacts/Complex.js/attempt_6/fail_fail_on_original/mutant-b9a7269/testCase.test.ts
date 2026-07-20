import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should correctly floor complex numbers with a valid places value", () => {
    const complex = new Complex(1.234, 5.678);
    const floored = complex.floor(2);
    expect(floored.re).toBeCloseTo(1.23);
    expect(floored.im).toBeCloseTo(5.68);
  });

  it("should throw an error when floor is called with a non-numeric places value", () => {
    const complex = new Complex(1.234, 5.678);
    expect(() => complex.floor(true)).toThrowError();
  });
});