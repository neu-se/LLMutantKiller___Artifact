import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc mutation test', () => {
  it('should compute acsc of a purely imaginary number correctly', () => {
    // acsc(i) = asin(1/i) = asin(-i)
    // For z = i (a=0, b=1), d = 0*0 + 1*1 = 1 != 0
    // so takes path: new Complex(0/1, -1/1).asin() = new Complex(0, -1).asin()
    // asin(-i) = -i * log(i*(-i) + sqrt(1 - (-i)^2))
    //          = -i * log(1 + sqrt(2))
    // Re = 0, Im = -log(1 + sqrt(2)) ≈ -0.8813735870195430
    const result = new Complex(0, 1).acsc();
    const expected = new Complex(0, -Math.log(1 + Math.sqrt(2)));
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});