import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate division', () => {
    const z1 = new Complex(3, 4);
    const z2 = new Complex(2, 1);
    const result = z1.div(z2);
    expect(result.re).toBeCloseTo((3 * 2 + 4 * 1) / (2 * 2 + 1 * 1));
    expect(result.im).toBeCloseTo((4 * 2 - 3 * 1) / (2 * 2 + 1 * 1));
  });
});