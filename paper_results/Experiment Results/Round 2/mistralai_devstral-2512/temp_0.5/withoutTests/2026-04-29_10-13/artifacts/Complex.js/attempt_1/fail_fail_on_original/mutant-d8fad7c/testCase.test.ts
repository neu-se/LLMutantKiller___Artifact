import { Complex } from "./complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute acsch for non-zero imaginary part", () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});