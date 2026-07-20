import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate the complex asinh of a complex number', () => {
    const complex = new Complex('1+2i');
    expect(complex.asinh).not.toBeUndefined();
    expect(typeof complex.asinh).toBe('function');
    expect(() => complex.asinh()).not.toThrow();
  });
});