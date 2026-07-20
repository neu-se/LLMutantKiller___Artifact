import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosh fallback', () => {
  it('original cosh fallback returns 1-x for small x giving result less than 1', () => {
    // If Math.cosh is unavailable, original returns 1-x for small positive x
    // This is < 1 (mathematically wrong but original behavior)
    // Mutated returns correct (exp+exp)/2 >= 1
    // Test via tan: tan(0 + bi) imaginary = sinh(2b)/(1 + cosh(2b))
    // For b = 4e-10, 2b = 8e-10 < 1e-9:
    // Original cosh(8e-10) = 1 - 8e-10, so denom = 2 - 8e-10
    // Mutated cosh(8e-10) = ~1, so denom = 2
    // sinh(8e-10) ≈ 8e-10
    // Original im = 8e-10 / (2 - 8e-10) ≈ 4e-10 * (1 + 4e-10) 
    // Mutated im = 8e-10 / 2 = 4e-10
    // Difference is ~1.6e-19, too small to detect
    
    // Better: use cosh directly
    // cosh(x + 0i) = cosh(x)*cos(0) + i*sinh(x)*sin(0) = cosh(x)
    // Original: 1 - 5e-10 = 0.9999999995
    // Mutated: ~1.000000000000000125
    // But Math.cosh exists so both give 1...
    
    // What if we test with a value just at the boundary?
    // x = 1e-9 exactly: Math.abs(1e-9) < 1e-9 is FALSE
    // So original also uses exp formula for x = 1e-9
    // x = 9.99e-10: original uses 1-x, mutated uses exp formula
    
    const x = 9.99e-10;
    const originalExpected = 1 - x; // 0.999999999001
    const result = new Complex(x, 0).cosh();
    expect(result.re).toBeCloseTo(originalExpected, 11);
  });
});