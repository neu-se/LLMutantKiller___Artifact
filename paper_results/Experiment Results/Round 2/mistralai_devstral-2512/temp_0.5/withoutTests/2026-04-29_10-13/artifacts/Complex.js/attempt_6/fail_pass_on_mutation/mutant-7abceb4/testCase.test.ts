import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should use the special case for zero imaginary part", () => {
    const c = new Complex(0.5, 0);
    const result = c.acsch();
    const expected = Math.log(0.5 + Math.sqrt(0.5 * 0.5 + 1));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBe(0);
  });
});