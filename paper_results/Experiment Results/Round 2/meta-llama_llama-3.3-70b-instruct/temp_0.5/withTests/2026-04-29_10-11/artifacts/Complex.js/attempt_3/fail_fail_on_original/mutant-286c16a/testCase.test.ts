import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should calculate the complex asinh of a complex number', () => {
    const complex = new Complex('1+2i');
    const result = complex.asinh();
    expect(result).not.toBeNull();
    expect(result.re).not.toBeNull();
    expect(result.im).not.toBeNull();
  });
});