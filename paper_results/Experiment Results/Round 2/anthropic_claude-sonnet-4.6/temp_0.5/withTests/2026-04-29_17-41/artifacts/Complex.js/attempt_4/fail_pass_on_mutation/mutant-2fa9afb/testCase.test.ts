import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow with complex exponent', () => {
  it('should correctly compute (2+3i)^(1+i) which is non-zero', () => {
    const base = new Complex(2, 3);
    const exp = new Complex(1, 1);
    const result = base.pow(exp);
    
    // With mutation if(true), this returns Complex.ZERO instead of correct value
    expect(result.re).not.toBeCloseTo(0, 5);
  });
});