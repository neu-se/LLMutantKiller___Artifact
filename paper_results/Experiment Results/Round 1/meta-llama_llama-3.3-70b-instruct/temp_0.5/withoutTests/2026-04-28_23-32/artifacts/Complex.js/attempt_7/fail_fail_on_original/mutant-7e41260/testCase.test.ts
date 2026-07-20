import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate division', () => {
    const complex1 = new Complex(1, 1);
    const complex2 = new Complex(1, 2);
    const result = complex1.div(complex2);
    const expectedReal = (1 * 2 - 1 * 1) / (1 * 1 + 2 * 2);
    const expectedImaginary = (1 * 1 + 1 * 2) / (1 * 1 + 2 * 2);
    expect(result.re).toBeCloseTo(expectedReal, 6);
    expect(result.im).toBeCloseTo(expectedImaginary, 6);
  });
});