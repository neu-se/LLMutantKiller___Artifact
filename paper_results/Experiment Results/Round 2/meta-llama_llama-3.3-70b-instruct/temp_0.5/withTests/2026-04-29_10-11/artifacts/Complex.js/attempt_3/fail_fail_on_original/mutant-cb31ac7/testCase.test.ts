import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const complex = new Complex(Math.PI / 4, 0);
    const result = complex.expm1();
    const expectedRe = Math.expm1(Math.PI / 4) * Math.cos(Math.PI / 4) + Math.cosm1(Math.PI / 4);
    const expectedIm = Math.exp(Math.PI / 4) * Math.sin(Math.PI / 4);
    expect(result.re).toBeCloseTo(expectedRe, 5);
    expect(result.im).toBeCloseTo(expectedIm, 5);
  });
});