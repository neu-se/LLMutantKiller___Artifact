import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should handle 0^0 case correctly with positive real exponent", () => {
    const result = new Complex(0, 0).pow(1, 0);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});