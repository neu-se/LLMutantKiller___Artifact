import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acot', () => {
  it('acot of pure imaginary number with unit magnitude should give correct result', () => {
    // acot(i/2) = atan(1/(i/2)) = atan(2/i) = atan(-2i)
    // For z = 0 + 0.5i: a=0, b=0.5, d=0.25 != 0
    // Result = new Complex(0/0.25, -0.5/0.25).atan() = new Complex(0, -2).atan()
    // atan(0, -2): a=0, b=-2, not ±1
    // d = 0 + (1-(-2))^2 = 9
    // t1 = Complex((1-4-0)/9, 0).log() = Complex(-1/3, 0).log()
    // log(-1/3, 0): b=0, a=-1/3 < 0, falls through
    // logHypot(-1/3, 0) = log(1/3), atan2(0, -1/3) = PI
    // t1 = Complex(log(1/3), PI)
    // return Complex(-PI/2, log(1/3)/2)
    const result = new Complex(0, 0.5).acot();
    expect(result.re).toBeCloseTo(-Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(Math.log(1/3) / 2, 10);
  });
});