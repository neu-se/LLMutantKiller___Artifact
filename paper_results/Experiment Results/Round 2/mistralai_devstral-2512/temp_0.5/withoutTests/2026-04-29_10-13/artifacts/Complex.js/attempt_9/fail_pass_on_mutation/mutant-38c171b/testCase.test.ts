import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle division by zero in acsch calculation for non-zero imaginary components", () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    expect(result.re).toBe(0);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});