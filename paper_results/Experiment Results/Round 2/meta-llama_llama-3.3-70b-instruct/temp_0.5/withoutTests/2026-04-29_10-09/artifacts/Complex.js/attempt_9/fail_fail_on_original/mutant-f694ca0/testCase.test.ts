import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should calculate cosm1 correctly for small x", () => {
    const x = 0.000001;
    const result = Complex.cosm1(x);
    const expected = -0.5 * x * x;
    expect(Math.abs(result - expected)).toBeLessThan(1e-12);
  });
});