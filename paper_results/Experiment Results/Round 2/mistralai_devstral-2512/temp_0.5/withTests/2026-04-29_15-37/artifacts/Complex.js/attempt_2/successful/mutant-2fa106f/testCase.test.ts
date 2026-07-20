import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atan", () => {
  it("should return Complex(0, Infinity) when input is Complex(0, 1)", () => {
    const result = new Complex(0, 1).atan();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});