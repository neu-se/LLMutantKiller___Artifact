import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc with tiny real value', () => {
  it('acsc with subnormal real part where d underflows to zero', () => {
    // Use a value so small that a*a + b*b underflows to 0 in floating point
    // but a itself is non-zero, triggering the d===0 fallback branch
    const tinyA = 5e-324; // smallest positive double (subnormal)
    const result = new Complex(tinyA, 0).acsc();
    // In original: real part = a/0 = Infinity, then asin(Infinity, 0)
    // In mutated: real part = 0, then asin(0, 0) = 0
    expect(result.re).not.toBe(0);
  });
});