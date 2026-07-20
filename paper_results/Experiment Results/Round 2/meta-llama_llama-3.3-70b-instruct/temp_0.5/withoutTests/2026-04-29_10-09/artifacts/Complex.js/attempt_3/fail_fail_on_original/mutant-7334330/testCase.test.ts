import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate division', () => {
    const z1 = new Complex(2, 1);
    const z2 = new Complex(1, 2);
    const result = z1.div(z2);
    expect(result.re).toBeCloseTo((2 * 1 - 1 * 2) / (1 * 1 + 2 * 2));
    expect(result.im).toBeCloseTo((1 * 1 + 2 * 2) / (1 * 1 + 2 * 2));
  });
});