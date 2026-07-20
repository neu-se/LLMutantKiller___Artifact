import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot mutation test', () => {
  it('should compute acot correctly for a complex number with non-zero imaginary part', () => {
    // For z = 1 + i, acot(z) should produce a finite complex number
    // In the original code: d = a*a + b*b != 0, so it uses the first branch (a/d, -b/d).atan()
    // In the mutated code: d !== 0 means condition is false, so it uses the second (infinity) branch
    const z = new Complex(1, 1);
    const result = z.acot();
    
    // The result should be finite
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    
    // acot(1+i) = atan(1/(1+i)) = atan((1-i)/2)
    // Expected values: approximately re=0.5535743588970452, im=-0.4023594781085251
    expect(result.re).toBeCloseTo(0.5535743588970452, 10);
    expect(result.im).toBeCloseTo(-0.4023594781085251, 10);
  });
});