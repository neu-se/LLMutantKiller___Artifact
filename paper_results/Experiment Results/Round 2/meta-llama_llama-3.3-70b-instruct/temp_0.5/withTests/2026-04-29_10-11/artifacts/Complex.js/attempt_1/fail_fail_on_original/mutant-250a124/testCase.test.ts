import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate division of complex numbers', () => {
    const complex1 = new Complex(1, 2);
    const complex2 = new Complex(3, 4);
    const result = complex1.div(complex2);
    expect(result.re).toBeCloseTo(-0.12, 5);
    expect(result.im).toBeCloseTo(0.24, 5);
  });
});