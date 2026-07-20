import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should correctly calculate expm1 for small values of x", () => {
    const x = 0.01;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = Math.expm1(x);
    expect(Math.abs(result.re - expected)).toBeLessThan(1e-5);
  });
});