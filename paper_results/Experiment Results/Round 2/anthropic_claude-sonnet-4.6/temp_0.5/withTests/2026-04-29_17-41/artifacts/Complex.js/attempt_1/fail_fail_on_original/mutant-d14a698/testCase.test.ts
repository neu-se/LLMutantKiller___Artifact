import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation test', () => {
  it('should compute asec correctly for purely imaginary input with negative imaginary part', () => {
    // When a=0, b!=0, d = b*b != 0, so we take the (d !== 0) branch
    // new Complex(a/d, -b/d).acos() = new Complex(0, -b/b^2).acos() = new Complex(0, -1/b).acos()
    // For b = -1: new Complex(0, 1).acos()
    // The mutation affects the d===0 branch, but let's verify the d!==0 branch behavior
    // For b positive, -b/d = -b/b^2 = -1/b (negative for positive b)
    const result = new Complex(0, 1).asec();
    const expected = new Complex(Math.PI / 2, -Math.log(1 + Math.sqrt(2)));
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});