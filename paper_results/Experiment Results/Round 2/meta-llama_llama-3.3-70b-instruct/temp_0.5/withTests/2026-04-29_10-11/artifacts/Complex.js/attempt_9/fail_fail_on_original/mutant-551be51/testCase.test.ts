import { Complex } from '../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return a Complex object with ceil function', () => {
    const complex = new Complex(1.2, 3.4);
    expect(complex.ceil).toBeDefined();
    expect(typeof complex.ceil).toBe('function');
  });
});