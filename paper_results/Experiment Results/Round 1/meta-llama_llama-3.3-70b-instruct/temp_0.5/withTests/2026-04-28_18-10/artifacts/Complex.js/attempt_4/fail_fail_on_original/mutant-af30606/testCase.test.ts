import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for the sech function', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    expect(result.im).not.toBeCloseTo(-2 / Math.sinh(1) * Math.sin(1) / (Math.cos(2) + Math.cosh(2)), 1e-10);
  });
});