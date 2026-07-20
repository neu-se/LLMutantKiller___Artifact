import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(2 / (1 + Math.cosh(0)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});