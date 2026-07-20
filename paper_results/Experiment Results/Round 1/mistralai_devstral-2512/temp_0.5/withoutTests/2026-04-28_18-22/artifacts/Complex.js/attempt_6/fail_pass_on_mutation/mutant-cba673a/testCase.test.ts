import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh function", () => {
  it("should return a valid complex number when computing cosh", () => {
    const c = new Complex(0.5, 0);
    const result = c.cosh();
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});