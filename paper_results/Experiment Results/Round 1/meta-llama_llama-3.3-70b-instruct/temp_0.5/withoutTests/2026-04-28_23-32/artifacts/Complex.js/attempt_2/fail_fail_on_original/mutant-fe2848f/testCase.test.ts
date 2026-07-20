import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for complex numbers', () => {
    const complex = new Complex(1.5, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(0, 10);
  });
});