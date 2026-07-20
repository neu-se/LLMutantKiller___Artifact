import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acot', () => {
  it('acot of purely imaginary number i gives correct result', () => {
    // acot(i) = atan(1/i) = atan(-i) which should be -i*Infinity
    const result = new Complex(0, 1).acot();
    // b=1, d=1, normal path: atan(Complex(0,-1))
    // atan(0,-1): a=0, b=-1 -> special case returns Complex(0, -Infinity)
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
  });
});