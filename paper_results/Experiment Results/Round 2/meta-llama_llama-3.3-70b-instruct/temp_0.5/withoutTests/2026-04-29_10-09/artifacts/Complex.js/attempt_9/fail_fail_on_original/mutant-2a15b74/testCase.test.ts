import { Complex } from '../../complex';

describe('Complex', () => {
  it('should correctly calculate division of two complex numbers', () => {
    const a = new Complex(1, 2);
    const b = new Complex(3, 4);
    const result = a.div(b);
    const x = b.re / b.im;
    expect(result.re).toBeCloseTo((a.re + a.im * x) / (b.re / x + b.im), 10);
    expect(result.im).toBeCloseTo((a.im - a.re * x) / (b.re / x + b.im), 10);
  });
});