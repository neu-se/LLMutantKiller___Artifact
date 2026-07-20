import { Complex } from "../../../../../complex.js";

describe("Complex", () => {
  it("should throw an error when calculating atan for a complex number with real part 0 and imaginary part 1 in the mutated code", () => {
    const complexNumber = new Complex(0, 1);
    expect(() => complexNumber.atan()).toThrow();
  });
});