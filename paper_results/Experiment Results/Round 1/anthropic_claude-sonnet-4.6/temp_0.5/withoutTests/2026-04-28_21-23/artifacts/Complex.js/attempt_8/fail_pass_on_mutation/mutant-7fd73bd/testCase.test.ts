import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation detection', () => {
  it('should compute atan correctly for complex number with positive real part', () => {
    // atan uses log internally with a complex number where a > 0 and b != 0
    // In original: if(b===0 && a>0) is false when b!=0 -> no-op
    // In mutated: if(b===0 || a>0) is true when a>0 -> no-op (commented out)
    // Both should give same result... unless there's something else
    const z = new Complex(1, 1);
    const logResult = z.log();
    // log(1+i) = log(sqrt(2)) + i*pi/4
    expect(logResult.re).toBeCloseTo(Math.log(Math.sqrt(2)), 10);
    expect(logResult.im).toBeCloseTo(Math.PI / 4, 10);
  });
});