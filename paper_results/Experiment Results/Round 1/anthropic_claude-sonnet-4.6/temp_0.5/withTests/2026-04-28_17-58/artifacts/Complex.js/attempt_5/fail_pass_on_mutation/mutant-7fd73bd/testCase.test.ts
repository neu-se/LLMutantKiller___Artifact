import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex isFinite mutation detection', () => {
  it('should correctly identify a complex number with one infinite component as infinite', () => {
    // If && becomes || in isFinite:
    // isFinite(Infinity, 0): isFinite(Infinity) || isFinite(0) = false || true = true
    // So isInfinite would return false incorrectly
    const c = new Complex(Infinity, 0);
    expect(c.isInfinite()).toBe(true);
    
    // Adding with infinity should return INFINITY not NaN
    const result = new Complex(1, 1).add(c);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});