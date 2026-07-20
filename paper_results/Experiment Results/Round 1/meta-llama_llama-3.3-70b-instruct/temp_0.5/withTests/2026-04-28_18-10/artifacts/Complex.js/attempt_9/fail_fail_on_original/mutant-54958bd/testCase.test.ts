import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return a complex number when calculating acosh', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(result).toBeInstanceOf(Complex);
  });
});