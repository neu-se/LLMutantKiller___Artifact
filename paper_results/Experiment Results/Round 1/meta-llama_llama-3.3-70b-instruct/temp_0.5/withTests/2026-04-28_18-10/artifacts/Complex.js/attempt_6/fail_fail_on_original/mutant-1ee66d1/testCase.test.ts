import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should detect the mutation in the acsc function', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});