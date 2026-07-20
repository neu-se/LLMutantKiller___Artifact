import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should define the Complex class', () => {
    expect(Complex).toBeInstanceOf(Function);
    const complex = new Complex(1, 2);
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});