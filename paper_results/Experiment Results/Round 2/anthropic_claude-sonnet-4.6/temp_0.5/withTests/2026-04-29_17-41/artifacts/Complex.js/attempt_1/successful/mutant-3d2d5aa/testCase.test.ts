import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth mutation test', () => {
  it('should correctly compute acoth for very small imaginary values where d underflows to zero', () => {
    // Use a very small b value where b*b underflows to 0, and a = 0
    // so d = a*a + b*b = 0, but b !== 0
    const tinyB = 5e-324; // smallest positive double
    const c = new Complex(0, tinyB);
    const result = c.acoth();
    // Original: (b !== 0) ? -b/0 : 0 => -tinyB/0 = -Infinity
    // Mutated: (false) ? -b/0 : 0 => 0
    // Then .atanh() is called on Complex(0, -Infinity) vs Complex(0, 0)
    expect(result.re).not.toBe(0); // original gives non-zero result
  });
});