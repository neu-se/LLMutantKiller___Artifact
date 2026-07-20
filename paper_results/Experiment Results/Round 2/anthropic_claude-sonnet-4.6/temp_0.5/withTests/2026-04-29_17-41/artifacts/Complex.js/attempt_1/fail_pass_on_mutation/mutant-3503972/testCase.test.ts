import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch of a purely imaginary number", () => {
    // acsch(i) = -i * pi/2
    // For z = i (re=0, im=1):
    // d = 0 + 1 = 1
    // new Complex(0/1, -1/1).asinh() = new Complex(0, -1).asinh()
    // asinh(-i) = -i * asin(i * (-i)) = -i * asin(1) = -i * pi/2
    // So re = 0, im = -pi/2
    const result = new Complex(0, 1).acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);

    // Also test with negative imaginary: acsch(-i) should give im = pi/2
    const result2 = new Complex(0, -1).acsch();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(Math.PI / 2, 10);
  });
});