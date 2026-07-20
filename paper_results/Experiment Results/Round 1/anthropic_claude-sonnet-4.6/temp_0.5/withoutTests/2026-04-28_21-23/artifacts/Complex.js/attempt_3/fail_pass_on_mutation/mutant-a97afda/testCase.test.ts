import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan', () => {
  it('should return a non-infinite result for atan(1 + 0i)', () => {
    const c = new Complex(1, 0);
    const result = c.atan();
    
    // Original: b=0, if(b===1) is false, computes π/4
    // Mutated: if(true) always executes, returns INFINITY or wrong value
    expect(result.isInfinite()).toBe(false);
    expect(result.re).toBeCloseTo(Math.PI / 4, 10);
  });
});