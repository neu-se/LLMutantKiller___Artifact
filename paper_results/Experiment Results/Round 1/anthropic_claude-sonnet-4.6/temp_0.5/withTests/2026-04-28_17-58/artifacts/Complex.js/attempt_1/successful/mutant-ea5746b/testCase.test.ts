import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosm1 mutation detection via expm1', () => {
  it('should compute expm1 accurately for purely imaginary input near pi/4', () => {
    // cosm1 is used in expm1: expm1(a)*cos(b) + cosm1(b)
    // For a=0, b=pi/4: result.re = expm1(0)*cos(pi/4) + cosm1(pi/4) = 0 + cosm1(pi/4)
    // cosm1(pi/4) = cos(pi/4) - 1 = sqrt(2)/2 - 1
    const b = Math.PI / 4;
    const c = new Complex(0, b);
    const result = c.expm1();
    
    // The real part should be cosm1(pi/4) = cos(pi/4) - 1
    const expected = Math.cos(b) - 1;
    
    // The mutation changes + 1/479001600 to - 1/479001600
    // This causes a difference of 2 * (pi/4)^6 / 479001600 ≈ 9.8e-10
    // which is larger than Number.EPSILON but we need to check with sufficient precision
    expect(result.re).toBeCloseTo(expected, 10);
    
    // More precise check
    const diff = Math.abs(result.re - expected);
    expect(diff).toBeLessThan(1e-9);
  });
});