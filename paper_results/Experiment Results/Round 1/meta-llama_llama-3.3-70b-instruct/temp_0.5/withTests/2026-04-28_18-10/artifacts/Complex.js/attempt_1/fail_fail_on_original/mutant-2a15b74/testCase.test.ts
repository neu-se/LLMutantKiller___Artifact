import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate division correctly', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 4);
    const result = c1.div(c2);
    expect(result.re).toBeCloseTo((1 * 3 + 2 * 4) / (3 * 3 + 4 * 4));
    expect(result.im).toBeCloseTo((2 * 3 - 1 * 4) / (3 * 3 + 4 * 4));
  });
});