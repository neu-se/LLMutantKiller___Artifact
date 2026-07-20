import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec d=0 fallback mutation detection', () => {
  it('should compute asec with correct sign for extremely small imaginary part causing d underflow', () => {
    // Use extremely small values so that a*a + b*b underflows to 0
    // but a and b themselves are not zero (avoiding early return)
    // With b > 0: original gives -b/0 = -Infinity, mutated gives +b/0 = +Infinity
    const tiny = 5e-324; // Number.MIN_VALUE
    const z = new Complex(0, tiny);
    const result = z.asec();
    // In original: imaginary part of the acos input is -Infinity (negative)
    // In mutated: imaginary part of the acos input is +Infinity (positive)
    // acos(0 - i*Infinity) vs acos(0 + i*Infinity) differ in sign of imaginary part
    expect(result.im).toBeLessThan(0);
  });
});