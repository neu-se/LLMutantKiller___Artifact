import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should return ONE when exponent is ZERO regardless of base", () => {
    const base = new Complex(0, 0);
    const exponent = new Complex(0, 0);
    const result = base.pow(exponent);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});