import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate division', () => {
    const complex1 = new Complex(2, 3);
    const complex2 = new Complex(4, 5);
    const result = complex1.div(complex2);
    const expectedReal = (2 * 5 - 3 * 4) / (4 * 4 + 5 * 5);
    const expectedImaginary = (2 * 4 + 3 * 5) / (4 * 4 + 5 * 5);
    expect(result.re).toBeCloseTo(expectedReal, 6);
    expect(result.im).toBeCloseTo(expectedImaginary, 6);
  });
});