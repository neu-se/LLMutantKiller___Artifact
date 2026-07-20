import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate cosh correctly for a case where Math.cosh is not defined', () => {
    const originalCosh = Math.cosh;
    delete Math.cosh;
    const complex = new Complex(0, 0);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
    Math.cosh = originalCosh;
  });
});