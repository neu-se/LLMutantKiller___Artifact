import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should export the Complex class when using CommonJS and AMD', () => {
    if (typeof define === 'function' && define['amd']) {
      expect(define).toBeInstanceOf(Function);
    } else if (typeof exports === 'object') {
      expect(exports).toBeInstanceOf(Object);
    }
    const complex = new Complex(1, 2);
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});