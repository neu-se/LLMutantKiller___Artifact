import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('acsc of purely imaginary number with negative imaginary part', () => {
    // acsc(-2i) = asin(1/(-2i)) = asin(i/2)
    // asin(0 + 0.5i): a=0, b=0.5
    // t1 = sqrt(0.25 - 0 + 1, 0) = sqrt(1.25, 0) = (sqrt(1.25), 0)
    // t2 = log(sqrt(1.25) - 0.5, 0 + 0) = log(sqrt(1.25)-0.5, 0)
    // result = (t2.im, -t2.re) = (0, -log(sqrt(1.25)-0.5))
    // = (0, log(sqrt(1.25)+0.5)) [since log(x-y) = -log(1/(x-y))]
    // acsc(-2i) should have re=0
    const result = new Complex(0, -2).acsc();
    // For normal inputs d = 0 + 4 = 4 != 0, takes normal path
    // new Complex(0/4, -(-2)/4).asin() = new Complex(0, 0.5).asin()
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.log(Math.sqrt(1.25) + 0.5), 10);
  });
});