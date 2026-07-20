import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('acsc with subnormal purely imaginary input should produce non-zero imaginary result', () => {
    // Use a value where b*b underflows to 0, triggering the d===0 fallback
    // a=0, b=1e-200: d = 0*0 + (1e-200)*(1e-200) = 1e-400 = 0 (underflow)
    // Original: Complex(0, -b/0) = Complex(0, -Infinity).asin() => Complex(0, -Infinity)
    // Mutated:  Complex(0, -b*0) = Complex(0, 0).asin() => Complex(0, 0)
    const z = new Complex(0, 1e-200);
    const result = z.acsc();
    expect(result.im).toBe(-Infinity);
  });
});