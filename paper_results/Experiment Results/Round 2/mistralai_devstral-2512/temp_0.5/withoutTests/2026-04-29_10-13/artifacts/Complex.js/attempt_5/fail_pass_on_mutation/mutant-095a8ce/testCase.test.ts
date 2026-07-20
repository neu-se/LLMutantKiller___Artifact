import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should handle the special case of (0, 0) correctly", () => {
    const zero = new Complex(0, 0);
    const result = zero.acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2);
    expect(result.im).toBe(Infinity);
  });
});