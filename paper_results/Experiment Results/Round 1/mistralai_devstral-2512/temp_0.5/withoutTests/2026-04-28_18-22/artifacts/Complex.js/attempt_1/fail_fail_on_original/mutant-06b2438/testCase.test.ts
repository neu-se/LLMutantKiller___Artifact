import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should correctly compute the asech of a complex number", () => {
    const c = new Complex(0.5, 0);
    const result = c.asech();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
  });
});