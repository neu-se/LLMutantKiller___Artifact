import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle edge case with non-zero real and zero imaginary parts", () => {
    const c = new Complex(0.5, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(Math.log(0.5 + Math.sqrt(0.25 + 1)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});