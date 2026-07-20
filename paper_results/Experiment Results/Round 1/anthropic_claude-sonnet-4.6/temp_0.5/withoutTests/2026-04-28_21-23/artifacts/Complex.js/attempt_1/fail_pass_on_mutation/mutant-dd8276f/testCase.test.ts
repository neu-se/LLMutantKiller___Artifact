import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acsc', () => {
  it('computes acsc for a complex number with nonzero imaginary part correctly', () => {
    // acsc(z) for z = 1+i
    const z = new Complex(1, 1);
    const result = z.acsc();
    // Compare with known value: acsc(1+i) = asin(1/(1+i))
    const expected = new Complex(1, 1).inverse().asin();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});