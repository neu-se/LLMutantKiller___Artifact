import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for complex numbers', () => {
    const complex = new Complex(0, 0);
    const result = complex.atanh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Math.PI / 2);
  });
});