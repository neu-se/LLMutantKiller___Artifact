import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should correctly calculate expm1 for small values of x", () => {
    const x = 0.0001;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(x), 0);
    expect(result.equals(expected.re, expected.im)).toBe(true);
  });
});