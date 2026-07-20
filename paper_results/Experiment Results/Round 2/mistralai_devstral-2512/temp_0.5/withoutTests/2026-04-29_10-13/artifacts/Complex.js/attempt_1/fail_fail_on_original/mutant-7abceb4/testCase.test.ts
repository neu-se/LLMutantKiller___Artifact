import { Complex } from "./complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute acsch for real numbers", () => {
    const c = new Complex(2, 0);
    const result = c.acsch();
    const expectedRe = Math.log(2 + Math.sqrt(2 * 2 + 1));
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(0);
  });
});