import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex1 = new Complex(1, 2);
    const complex2 = new Complex(1, -2);
    const result1 = complex1.acoth();
    const result2 = complex2.acoth();
    expect(result1.re).toBeCloseTo(result2.re, 5);
    expect(result1.im).not.toBeCloseTo(result2.im, 5);
  });
});