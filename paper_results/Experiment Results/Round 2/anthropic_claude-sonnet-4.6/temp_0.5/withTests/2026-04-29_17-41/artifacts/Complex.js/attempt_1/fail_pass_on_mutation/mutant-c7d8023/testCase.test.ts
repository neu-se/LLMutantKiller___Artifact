import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acsch mutation detection', () => {
  it('should correctly compute acsch for a purely imaginary number', () => {
    // acsch(i) = acsch(0 + 1i)
    // For b !== 0 and d !== 0, it goes through the (d !== 0) branch
    // which computes (a/d, -b/d).asinh()
    // For z = 0 + 1i: d = 0 + 1 = 1, so we get (0/1, -1/1).asinh() = (0, -1).asinh()
    const result = new Complex(0, 1).acsch();
    // asinh(0 - i) = -i * asin(i * (0 - i)) = -i * asin(1) = -i * pi/2
    // So result should be (0, -pi/2)
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});