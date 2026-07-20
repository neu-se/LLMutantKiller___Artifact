import { Complex } from "../../../../../../complex.js";

describe("Complex", () => {
  it("should return a specific value when calculating atan for a complex number with real part 0 and imaginary part 1", () => {
    const complexNumber = new Complex(0, 1);
    const result = complexNumber.atan();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});