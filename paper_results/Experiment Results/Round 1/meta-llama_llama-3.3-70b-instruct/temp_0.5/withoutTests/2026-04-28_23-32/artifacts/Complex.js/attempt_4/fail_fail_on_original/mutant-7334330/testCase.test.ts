import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate division', () => {
    const c1 = new Complex(4, 3);
    const c2 = new Complex(1, 1);
    const result = c1.div(c2);
    const expectedReal = (4 * 1 + 3 * 1) / (1 * 1 + 1 * 1);
    const expectedImaginary = (3 * 1 - 4 * 1) / (1 * 1 + 1 * 1);
    expect(result.re).toBeCloseTo(expectedReal);
    expect(result.im).toBeCloseTo(expectedImaginary);
  });
});