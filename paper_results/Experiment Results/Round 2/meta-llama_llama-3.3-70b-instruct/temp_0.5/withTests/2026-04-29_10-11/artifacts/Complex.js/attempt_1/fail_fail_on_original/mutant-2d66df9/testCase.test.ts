import { Complex } from '../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('parses complex number strings correctly', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
  });
});