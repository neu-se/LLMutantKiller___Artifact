import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate division', () => {
    const z1 = new Complex(1, 2);
    const z2 = new Complex(3, 4);
    const result = z1.div(z2);
    expect(result.re).toBeCloseTo((2 * 3 + 1 * 4) / (3 * 3 + 4 * 4));
    expect(result.im).toBeCloseTo((2 * 4 - 1 * 3) / (3 * 3 + 4 * 4));
  });
});