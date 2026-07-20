import { Complex } from './complex';

describe('Complex.js', () => {
  it('should calculate the complex asinh of a complex number', () => {
    const complex = new Complex('1+2i');
    const result = complex.asinh();
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
    expect('re' in result).toBe(true);
    expect('im' in result).toBe(true);
  });
});