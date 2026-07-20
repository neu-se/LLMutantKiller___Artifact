import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atan", () => {
  it("should handle the case when imaginary part is 1 without returning Infinity", () => {
    const c = new Complex(0, 1);
    const result = c.atan();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).not.toBe(Infinity);
  });
});