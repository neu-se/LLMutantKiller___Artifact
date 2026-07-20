import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan mutation detection', () => {
  it('should return finite result for atan(1 + 0i), not infinity', () => {
    // atan(1 + 0i) = pi/4, a finite real number
    // Original: b=0, so if(b===1) is false, normal computation proceeds
    // Mutated: if(true) always fires, returning Complex.INFINITY
    const z = new Complex(1, 0);
    const result = z.atan();
    expect(result.isInfinite()).toBe(false);
    expect(result.isNaN()).toBe(false);
    expect(result.re).toBeCloseTo(Math.PI / 4, 10);
  });
});