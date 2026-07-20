import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should export Complex as a function', () => {
    expect(typeof Complex).toBe('function');
    const complexInstance = new Complex(1, 2);
    expect(complexInstance).toBeInstanceOf(Complex);
  });
});