import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc mutation', () => {
  it('acsc of tiny complex number where squared magnitude underflows to zero', () => {
    const a = 5e-200;
    const b = 5e-200;
    expect(a * a + b * b).toBe(0); // verify underflow
    expect(a).not.toBe(0);
    expect(b).not.toBe(0);
    
    const result = new Complex(a, b).acsc();
    // Original: new Complex(Infinity, -Infinity).asin()
    // Mutated: new Complex(0, -Infinity).asin()
    // These give different results
    const originalExpected = new Complex(Infinity, -Infinity).asin();
    expect(result.re).toBeCloseTo(originalExpected.re, 5);
    expect(result.im).toBeCloseTo(originalExpected.im, 5);
  });
});