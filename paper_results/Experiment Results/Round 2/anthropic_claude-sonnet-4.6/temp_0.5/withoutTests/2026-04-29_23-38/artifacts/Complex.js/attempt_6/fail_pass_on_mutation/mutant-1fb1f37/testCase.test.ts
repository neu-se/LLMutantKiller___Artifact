import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosh fallback', () => {
  it('cosh of small positive value should be close to 1 but not less than 1', () => {
    // Math.cosh(x) >= 1 for all real x (cosh is always >= 1)
    // Original fallback: for 0 < x < 1e-9, returns 1-x < 1 (WRONG)
    // Mutated fallback: returns (exp(x)+exp(-x))/2 >= 1 (CORRECT)
    // If Math.cosh is available, both use Math.cosh and result >= 1
    // If Math.cosh is NOT available:
    //   Original: cosh(5e-10) = 1 - 5e-10 < 1 -> sin(PI/2 + 5e-10*i).re < 1
    //   Mutated: cosh(5e-10) >= 1 -> sin(PI/2 + 5e-10*i).re >= 1
    const x = 5e-10;
    const result = new Complex(Math.PI / 2, x).sin();
    // cosh(x) >= 1 always (mathematically correct)
    // Original fallback gives < 1 for small positive x
    expect(result.re).toBeGreaterThanOrEqual(1 - 1e-15);
  });
});