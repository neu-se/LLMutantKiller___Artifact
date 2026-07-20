import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.exp", () => {
  it("should return a real number when the imaginary part is zero", () => {
    const c = new Complex(1, 0);
    const result = c.exp();
    expect(result.im).toBe(0);
    expect(result.re).toBeCloseTo(Math.E);
  });
});