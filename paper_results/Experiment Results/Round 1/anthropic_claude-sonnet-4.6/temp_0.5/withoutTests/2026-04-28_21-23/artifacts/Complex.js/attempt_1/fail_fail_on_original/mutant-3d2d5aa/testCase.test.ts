import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth fallback branch', () => {
  it('should return Infinity re part when a is non-zero but d underflows to zero', () => {
    // Use a subnormal number so small that a*a underflows to 0
    const tinyA = 5e-324; // smallest positive double
    const c = new Complex(tinyA, 0);
    const result = c.acoth();
    // In original: (a !== 0) ? a/0 : 0 => Infinity (since a > 0)
    // In mutant: (false) ? -b/0 : 0 => 0
    expect(result.re).toBe(Infinity);
  });
});