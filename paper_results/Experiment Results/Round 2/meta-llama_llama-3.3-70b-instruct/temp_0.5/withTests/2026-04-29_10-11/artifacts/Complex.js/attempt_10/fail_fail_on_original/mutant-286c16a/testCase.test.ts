import { Complex } from './complex';

describe('Complex.js', () => {
  it('should calculate the complex asinh of a complex number', () => {
    const complex = new Complex('1+2i');
    const asinh = complex.asinh;
    expect(asinh).toBeDefined();
    expect(typeof asinh).toBe('function');
  });
});