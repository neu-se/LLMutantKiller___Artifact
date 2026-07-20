import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate expm1 correctly', () => {
    const complex = new Complex(0.1);
    const result = complex.expm1();
    const expectedRe = Math.exp(0.1) * Math.cos(0) - 1;
    const expectedIm = Math.exp(0.1) * Math.sin(0);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});