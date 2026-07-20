import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('acsc imaginary sign is correct for negative imaginary input', () => {
    // For z = 0 - 2i: d = 4, uses d!=0 branch: new Complex(0, 2/4).asin() = new Complex(0, 0.5).asin()
    // The sign of the imaginary part in the result should be consistent
    // Test that acsc(-2i) = -conj(acsc(2i)) (odd function property)
    const pos = new Complex(0, 2).acsc();
    const neg = new Complex(0, -2).acsc();
    // acsc is an odd function: acsc(-z) = -acsc(z)
    expect(neg.re).toBeCloseTo(-pos.re, 10);
    expect(neg.im).toBeCloseTo(-pos.im, 10);
  });
});