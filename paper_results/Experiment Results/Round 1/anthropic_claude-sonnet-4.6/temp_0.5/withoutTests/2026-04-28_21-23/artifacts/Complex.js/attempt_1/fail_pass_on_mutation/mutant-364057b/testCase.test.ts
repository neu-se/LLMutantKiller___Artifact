import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech mutation test', () => {
  it('should compute asech correctly for a real number where a !== 0', () => {
    // asech(0.5) = acosh(1/0.5) = acosh(2)
    // For z = 0.5 (real), d = 0.5*0.5 + 0 = 0.25 != 0
    // So it goes to the d !== 0 branch: new Complex(0.5/0.25, 0/0.25).acosh() = new Complex(2, 0).acosh()
    const result = new Complex(0, 0).asech();
    // isZero() returns INFINITY
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
    
    // Test the actual computation path
    const result2 = new Complex(0.5, 0).asech();
    const expected = Math.log(1/0.5 + Math.sqrt(1/(0.5*0.5) - 1));
    expect(result2.re).toBeCloseTo(expected, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});