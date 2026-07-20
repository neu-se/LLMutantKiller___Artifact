import { Complex } from '../../../complex';

describe('Complex', () => {
  it('should calculate expm1 correctly for small input', () => {
    const complex = new Complex(0.0001, 0);
    const result = complex.expm1();
    const expectedRe = Math.expm1(0.0001) * Math.cos(0) + Math.cosm1(0);
    const expectedIm = Math.exp(0.0001) * Math.sin(0);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});