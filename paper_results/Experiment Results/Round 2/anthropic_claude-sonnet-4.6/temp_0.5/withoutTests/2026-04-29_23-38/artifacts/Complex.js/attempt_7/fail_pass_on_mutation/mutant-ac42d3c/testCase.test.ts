import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan', () => {
  it('should return correct result for atan of (0, -1) used via acot', () => {
    // acot(0, 1) internally calls atan(0, -1)
    // acot(c) with c = i: d = 0+1 = 1, calls atan(0/1, -1/1) = atan(0, -1)
    // Original: atan(0,-1) returns Complex(0, -Infinity)
    // acot result should be Complex(0, -Infinity).atan() ... wait no
    // acot returns atan(a/d, -b/d) = atan(0, -1) directly
    const c = new Complex(0, 1);
    const result = c.acot();
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
  });
});