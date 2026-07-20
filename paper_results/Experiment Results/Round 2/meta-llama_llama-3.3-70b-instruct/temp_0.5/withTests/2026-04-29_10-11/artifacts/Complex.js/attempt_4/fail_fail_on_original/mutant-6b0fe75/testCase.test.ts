import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const originalCosh = Math.cosh;
    Math.cosh = undefined;
    const complex = new Complex(1, 0);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo(Math.exp(1) + Math.exp(-1), 0.5);
    expect(result.im).toBeCloseTo(0);
    Math.cosh = originalCosh;
  });
});