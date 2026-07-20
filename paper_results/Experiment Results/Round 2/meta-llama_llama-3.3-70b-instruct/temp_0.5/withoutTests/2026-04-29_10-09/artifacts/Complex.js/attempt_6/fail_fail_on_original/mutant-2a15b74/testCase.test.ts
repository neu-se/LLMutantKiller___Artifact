import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate division of two complex numbers', () => {
    const a = new Complex(1, 2);
    const b = new Complex(3, 4);
    const result = a.div(b);
    const expectedRe = (a.re * b.re + a.im * b.im) / (b.re * b.re + b.im * b.im);
    const expectedIm = (a.im * b.re - a.re * b.im) / (b.re * b.re + b.im * b.im);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});