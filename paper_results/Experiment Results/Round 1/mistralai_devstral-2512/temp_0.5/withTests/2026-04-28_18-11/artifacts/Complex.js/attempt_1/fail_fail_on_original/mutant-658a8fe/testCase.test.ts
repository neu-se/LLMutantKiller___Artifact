import { Complex } from "./complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute acsch for non-zero complex numbers", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.3217505543966422);
    expect(result.im).toBeCloseTo(-0.40235947810852506);
  });
});