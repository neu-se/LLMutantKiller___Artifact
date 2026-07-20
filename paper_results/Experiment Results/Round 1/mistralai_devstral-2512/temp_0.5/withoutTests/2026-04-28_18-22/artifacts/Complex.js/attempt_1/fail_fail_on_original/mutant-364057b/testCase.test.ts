import { Complex } from "./complex.js";

describe("Complex.asech", () => {
  it("should return correct result for non-zero real input", () => {
    const c = new Complex(0.5, 0);
    const result = c.asech();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
  });
});