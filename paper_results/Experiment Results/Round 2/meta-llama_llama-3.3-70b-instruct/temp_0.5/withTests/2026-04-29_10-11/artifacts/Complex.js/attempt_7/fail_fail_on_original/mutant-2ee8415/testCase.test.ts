import { Complex } from './complex.js';

describe('Complex', () => {
  it('should not throw an error when calling asinh', () => {
    const complex = new Complex(1, 2);
    expect(() => {
      complex.asinh();
      expect(complex.re).toBeDefined();
    }).not.toThrowError();
  });
});