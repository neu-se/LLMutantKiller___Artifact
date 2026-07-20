import { Complex } from "./complex.js";

describe("Complex.acsc", () => {
  it("should correctly handle non-zero complex numbers", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.6669826732364947);
    expect(result.im).toBeCloseTo(-0.39269908169872414);
  });
});