import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate acosh correctly for values with negative imaginary part', () => {
    const complex = new Complex(2, -1);
    const result = complex.acosh();
    expect(result.im).toBeLessThan(0);
  });
});