import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const complex = new Complex(0.01);
    const result = complex.expm1();
    const expectedReal = Math.expm1(0.01) * Math.cos(0.01) + Math.cos(0.01) - 1;
    const expectedImaginary = Math.exp(0.01) * Math.sin(0.01);
    expect(result.re).toBeCloseTo(expectedReal, 1e-10);
    expect(result.im).toBeCloseTo(expectedImaginary, 1e-10);
  });
});