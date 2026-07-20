import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should return pi/2 as real part for asec of purely imaginary number', () => {
    // For z = 0 + 1i: a=0, b=1
    // Original: (a !== 0) ? a/0 : 0 => 0, so new Complex(0, -Infinity).acos()
    //   which returns re = pi/2
    // Mutated: (true) ? a/0 : 0 => NaN, so new Complex(NaN, -Infinity).acos()
    //   which returns NaN
    const result = new Complex(0, 1).asec();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
  });
});