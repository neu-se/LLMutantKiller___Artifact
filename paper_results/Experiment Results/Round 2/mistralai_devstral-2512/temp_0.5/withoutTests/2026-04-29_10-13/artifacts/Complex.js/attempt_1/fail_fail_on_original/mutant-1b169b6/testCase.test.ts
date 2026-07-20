import { Complex } from "./complex.js";

describe("Complex.acoth", () => {
  it("should correctly compute acoth for non-zero complex numbers", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.14694666622552978);
    expect(result.im).toBeCloseTo(-0.3323069904224528);
  });
});