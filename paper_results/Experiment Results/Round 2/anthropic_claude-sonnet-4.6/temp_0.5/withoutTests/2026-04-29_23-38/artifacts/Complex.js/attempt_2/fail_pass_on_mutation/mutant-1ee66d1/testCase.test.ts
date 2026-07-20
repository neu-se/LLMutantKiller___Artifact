import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc with subnormal inputs', () => {
  it('should return infinity imaginary part when acsc called with very small complex number causing d to underflow', () => {
    // When a and b are so small that a*a + b*b underflows to 0,
    // but b !== 0, the original code uses -b/0 (Infinity) while mutant uses -b*0 (0)
    const tiny = Number.MIN_VALUE;
    const c = new Complex(tiny, tiny);
    const result = c.acsc();
    // In original: imaginary part of inner complex is -b/0 = -Infinity, leading to asin of infinity
    // In mutant: imaginary part is -b*0 = 0, leading to different result
    expect(result.im).not.toBe(0);
    expect(!isFinite(result.im) || !isFinite(result.re)).toBe(true);
  });
});