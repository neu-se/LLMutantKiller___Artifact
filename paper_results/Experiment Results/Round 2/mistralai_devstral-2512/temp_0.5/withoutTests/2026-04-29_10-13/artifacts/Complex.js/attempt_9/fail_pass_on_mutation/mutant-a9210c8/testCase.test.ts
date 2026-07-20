import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should fail when imaginary part is not properly accessed", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    // The mutation changes `var b = this['im']` to `var b = this[""]`
    // This will cause the calculation to use undefined instead of the imaginary part
    // The test should pass on original code but fail on mutated code
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});