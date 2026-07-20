import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc mutation test', () => {
  it('should correctly compute acsc for a purely imaginary number', () => {
    // acsc(i) = asin(1/i) = asin(-i)
    // For z = i (a=0, b=1): d = 1, uses new Complex(0/1, -1/1).asin() = new Complex(0, -1).asin()
    const result = new Complex(0, 1).acsc();
    // asin(-i) = -i * log(-i + sqrt(1 - (-i)^2)) = -i * log(-i + sqrt(2))
    // The imaginary part should be negative
    expect(result.im).toBeLessThan(0);
  });
});