import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate division', () => {
    const complex1 = new Complex(4, 3);
    const complex2 = new Complex(2, 1);
    const result = complex1.div(complex2);
    const expectedReal = (4 * 2 - 3 * 1) / (2 * 2 + 1 * 1);
    const expectedImaginary = (4 * 1 + 3 * 2) / (2 * 2 + 1 * 1);
    expect(result.re).toBeCloseTo(expectedReal, 6);
    expect(result.im).toBeCloseTo(expectedImaginary, 6);
  });
});