import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for expm1', () => {
    const complex = new Complex(0.1, 0.1);
    const expm1 = complex.expm1();
    expect(expm1.re).toBeCloseTo(Math.expm1(0.1) * Math.cos(0.1) + Math.cos(0.1) - 1, 5);
    expect(expm1.im).toBeCloseTo(Math.exp(0.1) * Math.sin(0.1), 5);
  });
});