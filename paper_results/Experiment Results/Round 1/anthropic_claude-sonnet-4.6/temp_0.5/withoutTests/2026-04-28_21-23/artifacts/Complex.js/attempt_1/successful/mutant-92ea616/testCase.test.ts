import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot mutation test', () => {
  it('should correctly compute acot for a complex number with non-zero imaginary part', () => {
    // For z = 0 + 2i, acot(z) should give a finite complex result
    // With the original code (d !== 0), when d = NaN (due to a = undefined), 
    // NaN !== 0 is true, so it takes the first branch
    // With mutated code (d === 0), NaN === 0 is false, so it takes the second branch
    // The second branch produces Infinity values
    
    const z = new Complex(0, 2);
    const result = z.acot();
    
    // acot(2i) = atan(1/(2i)) = atan(-i/2)
    // The result should be finite
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});