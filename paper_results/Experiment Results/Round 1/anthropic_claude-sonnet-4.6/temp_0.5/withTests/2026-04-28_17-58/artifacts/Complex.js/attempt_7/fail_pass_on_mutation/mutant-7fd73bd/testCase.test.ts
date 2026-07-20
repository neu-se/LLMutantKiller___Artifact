import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation detection', () => {
  it('should compute log of a complex number with positive real and nonzero imaginary part', () => {
    // Original: if (b===0 && a>0) wraps the return, so log(1+i) returns undefined
    // Mutated: if (b===0 || a>0) - a=1>0 is true, so return IS reached, returns proper value
    const result = new Complex(1, 1).log();
    // In original code, result would be undefined (outer if false, no return reached)
    // We test that result is a proper Complex number
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(0.5 * Math.log(2), 10);
    expect(result.im).toBeCloseTo(Math.PI / 4, 10);
  });
});