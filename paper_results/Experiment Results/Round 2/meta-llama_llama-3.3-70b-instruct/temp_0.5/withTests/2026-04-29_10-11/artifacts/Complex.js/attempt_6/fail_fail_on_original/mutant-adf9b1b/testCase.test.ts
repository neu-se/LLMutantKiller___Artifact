import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for expm1', () => {
    const c = new Complex(0.1, 0.1);
    const result = c.expm1();
    const expectedRe = Math.expm1(0.1) * Math.cos(0.1) + Math.cos(0.1) - 1;
    const expectedIm = Math.exp(0.1) * Math.sin(0.1);
    expect(result.re).toBeCloseTo(expectedRe, 5);
    expect(result.im).toBeCloseTo(expectedIm, 5);
  });
});