import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should correctly calculate the complex acosh", () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1.3169578969248166, 6);
    expect(result.im).toBeCloseTo(0, 6);
    const d = new Complex(2, 3);
    const result2 = d.acosh();
    expect(result2.im).not.toBeNaN();
    expect(() => {
      const e = new Complex(NaN, NaN);
      e.acosh();
    }).not.toThrow();
  });
});