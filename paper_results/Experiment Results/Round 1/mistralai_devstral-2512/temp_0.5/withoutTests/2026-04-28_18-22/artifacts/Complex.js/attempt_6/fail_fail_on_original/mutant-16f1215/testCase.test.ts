import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should handle the case where both real and imaginary parts are zero", () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    expect(result.isInfinite()).toBe(true);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});