import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly handle the case where a = 1.5 and b = 0", () => {
    const c = new Complex(1.5, 0);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(1.014943980522461);
    expect(result.im).toBe(0);
  });
});