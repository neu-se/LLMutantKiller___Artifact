import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('acsc of purely imaginary number has correct imaginary sign', () => {
    // For z = 2i: d = 4 != 0, uses: new Complex(0/4, -2/4).asin() = new Complex(0, -0.5).asin()
    // asin(0, -0.5): result should have im < 0
    // For z = -2i: d = 4 != 0, uses: new Complex(0/4, 2/4).asin() = new Complex(0, 0.5).asin()
    // These should be negatives of each other (odd function)
    const pos = new Complex(0, 2).acsc();
    const neg = new Complex(0, -2).acsc();
    // Verify acsc(-z) = -acsc(z)
    expect(pos.re).toBeCloseTo(-neg.re, 10);
    expect(pos.im).toBeCloseTo(-neg.im, 10);
    // Verify the sign is correct: acsc(2i) should have negative imaginary part
    expect(pos.im).toBeLessThan(0);
  });
});