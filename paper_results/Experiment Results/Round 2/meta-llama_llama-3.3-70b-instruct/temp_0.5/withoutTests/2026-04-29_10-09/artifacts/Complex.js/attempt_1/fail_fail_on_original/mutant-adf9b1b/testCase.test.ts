import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should correctly calculate cosm1 for small values of x", () => {
    const complex = new Complex(0.0001);
    const result = complex.exp().sub(1);
    const expected = new Complex(Math.expm1(0.0001), 0);
    expect(result.equals(expected.re, expected.im)).toBe(true);
  });
});