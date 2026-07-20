import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sech', () => {
  it('sech result should not be NaN for complex input with imaginary part', () => {
    const c = new Complex(1, 1);
    const result = c['sech']();
    // With mutation var b = this[""] = undefined, d = NaN, result is NaN
    // With original var b = this['im'] = 1, result is a valid number
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    // Additional: verify the imaginary part is non-zero (it would be 0 if b=0 or NaN if b=undefined)
    expect(Math.abs(result.im)).toBeGreaterThan(0.01);
  });
});