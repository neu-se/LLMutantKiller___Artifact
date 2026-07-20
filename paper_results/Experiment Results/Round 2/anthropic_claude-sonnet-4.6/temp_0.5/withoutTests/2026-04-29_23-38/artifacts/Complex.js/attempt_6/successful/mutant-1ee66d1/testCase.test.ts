import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('should return NaN for zero real and subnormal imaginary input', () => {
    const tiny = Number.MIN_VALUE;
    // a=0, b=tiny: d = 0 + tiny*tiny = 0 (underflow), b != 0, a == 0
    // Original: Complex(0, -tiny/0) = Complex(0, -Inf).asin() -> NaN (due to 0*Inf)
    // Mutant:   Complex(0, -tiny*0) = Complex(0, 0).asin() -> Complex(0, 0) (not NaN)
    const c = new Complex(0, tiny);
    const result = c.acsc();
    expect(result.isNaN()).toBe(true);
  });
});