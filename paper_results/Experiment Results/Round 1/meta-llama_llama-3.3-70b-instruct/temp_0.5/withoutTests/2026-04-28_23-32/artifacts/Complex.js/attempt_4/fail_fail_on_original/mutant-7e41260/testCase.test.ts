import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate division', () => {
    const complex1 = new Complex(3, 4);
    const complex2 = new Complex(2, 1);
    const result = complex1.div(complex2);
    expect(result.re).toBeCloseTo(1.8, 1);
    expect(result.im).toBeCloseTo(1.2, 1);
  });
});