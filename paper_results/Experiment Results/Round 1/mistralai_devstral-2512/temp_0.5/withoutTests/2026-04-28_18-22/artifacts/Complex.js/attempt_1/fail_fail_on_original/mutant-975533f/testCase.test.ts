import { Complex } from "./complex.js";

describe("Complex.acoth", () => {
  it("should correctly compute acoth for a complex number with negative imaginary part", () => {
    const c = new Complex(1, -1);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.4023594738185256, 10);
    expect(result.im).toBeCloseTo(-0.5535743588970452, 10);
  });
});