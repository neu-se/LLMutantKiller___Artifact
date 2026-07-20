import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate division', () => {
    const complex1 = new Complex(4, 3);
    const complex2 = new Complex(1, 2);
    const result = complex1.div(complex2);
    expect(result.re).toBeCloseTo(2.2, 1);
    expect(result.im).toBeCloseTo(-0.2, 1);
  });
});