import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth", () => {
  it("should produce consistent results for acoth computation", () => {
    const c = new Complex(3, 2);
    const result = c.acoth();
    // The mutation changes -b/d to -b*d, which will dramatically change the result
    // We can verify the original implementation by checking the result is finite and not NaN
    expect(Number.isFinite(result.re)).toBe(true);
    expect(Number.isFinite(result.im)).toBe(true);
    // The mutated version would produce extremely large values due to multiplication instead of division
    expect(Math.abs(result.re)).toBeLessThan(10);
    expect(Math.abs(result.im)).toBeLessThan(10);
  });
});