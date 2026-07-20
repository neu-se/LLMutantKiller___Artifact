import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the atanh of a complex number', () => {
    const complex = new Complex(1.5, 2);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.915, 3);
    expect(result.im).toBeCloseTo(0.782, 3);
  });
});