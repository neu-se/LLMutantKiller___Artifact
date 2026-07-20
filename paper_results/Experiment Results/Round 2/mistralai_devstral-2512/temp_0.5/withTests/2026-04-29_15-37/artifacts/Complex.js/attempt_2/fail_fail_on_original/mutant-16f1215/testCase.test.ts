import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should handle zero correctly in acsc", () => {
    const zero = new Complex(0, 0);
    const result = zero.acsc();
    expect(result.isInfinite()).toBe(true);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});