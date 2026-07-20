import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate acoth correctly for non-zero imaginary part', () => {
    const complex = new Complex(0, 1);
    const result = complex.acoth();
    expect(result.im).not.toBe(0);
  });
});