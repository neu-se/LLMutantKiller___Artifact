import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec function', () => {
  it('should return a finite real result for asec(2)', () => {
    const c = new Complex(2, 0);
    const result = c.asec();
    
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeCloseTo(Math.acos(0.5), 10);
  });
});