import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acsc mutation test', () => {
  it('acsc(0 + 1i) should have correct imaginary part sign', () => {
    // acsc(i) = asin(1/i) = asin(-i)
    // For z = 0 + 1i: d = 0 + 1 = 1, so result = new Complex(0/1, +1/1).asin() = new Complex(0, 1).asin()
    const result = new Complex(0, 1).acsc();
    // asin(i) = i * log(1 + sqrt(2)) ≈ 0 + 0.881i... wait
    // The +b/d vs -b/d matters here
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeLessThan(0); // should be negative
  });
});