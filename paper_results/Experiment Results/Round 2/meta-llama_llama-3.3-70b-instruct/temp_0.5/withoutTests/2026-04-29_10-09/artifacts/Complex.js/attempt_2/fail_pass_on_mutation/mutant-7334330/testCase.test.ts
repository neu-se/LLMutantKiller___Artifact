import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate division', () => {
    const z1 = new Complex(1, 2);
    const z2 = new Complex(1, 1);
    const result = z1.div(z2);
    expect(result.re).toBeCloseTo(1.5);
    expect(result.im).toBeCloseTo(0.5);
  });
});