import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate division of two complex numbers', () => {
    const a = new Complex(1, 2);
    const b = new Complex(3, 4);
    const result = a.div(b);
    expect(result.re).toBeCloseTo((a.re * b.re + a.im * b.im) / (b.re * b.re + b.im * b.im), 10);
    expect(result.im).toBeCloseTo((a.im * b.re - a.re * b.im) / (b.re * b.re + b.im * b.im), 10);
  });
});