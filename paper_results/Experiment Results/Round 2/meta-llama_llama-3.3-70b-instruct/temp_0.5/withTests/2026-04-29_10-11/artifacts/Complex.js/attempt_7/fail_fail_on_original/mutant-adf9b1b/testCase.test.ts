import { Complex } from '../complex';

describe('Complex', () => {
  it('should return the correct result for expm1', () => {
    const complex = new Complex(0.1, 0);
    const expm1 = complex.expm1();
    const expectedRe = Math.expm1(0.1);
    const expectedIm = 0;
    expect(expm1.re).toBeCloseTo(expectedRe, 5);
    expect(expm1.im).toBeCloseTo(expectedIm, 5);
  });
});