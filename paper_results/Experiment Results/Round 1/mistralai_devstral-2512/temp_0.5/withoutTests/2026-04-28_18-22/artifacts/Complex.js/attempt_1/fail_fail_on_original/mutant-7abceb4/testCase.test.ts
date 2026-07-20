import { Complex } from "./complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute acsch for a real number", () => {
    const c = new Complex(2, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347);
    expect(result.im).toBeCloseTo(0);
  });
});