import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should correctly calculate cosm1 for small values of x", () => {
    const x = 0.0001;
    const result = Complex.cosm1(x);
    const expected = Math.cos(x) - 1;
    expect(Math.abs(result - expected)).toBeLessThan(1e-10);
  });
});