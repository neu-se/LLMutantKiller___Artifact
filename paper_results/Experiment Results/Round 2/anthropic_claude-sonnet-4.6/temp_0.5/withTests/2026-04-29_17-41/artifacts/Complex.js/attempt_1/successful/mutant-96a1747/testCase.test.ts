import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex atanh mutation test', () => {
  it('should correctly compute atanh for real numbers greater than 1', () => {
    // For a > 1 and b === 0, atanh should return a complex number
    // with imaginary part = -π/2 (after negation in the noIM branch)
    const result = new Complex(2, 0).atanh();
    
    // The imaginary part should be -π/2 ≈ -1.5707963...
    // With the mutation, x['im'] = -x[""] = -undefined = NaN
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    expect(isNaN(result.im)).toBe(false);
  });
});