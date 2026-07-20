import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate the division of two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(2, 1);
    const result = c1.div(c2);
    expect(result.re).toBeCloseTo((c1.re * c2.re + c1.im * c2.im) / (c2.re * c2.re + c2.im * c2.im));
    expect(result.im).toBeCloseTo((c1.im * c2.re - c1.re * c2.im) / (c2.re * c2.re + c2.im * c2.im));
    const c3 = new Complex(1, 1);
    const c4 = new Complex(1, 0);
    const result2 = c3.div(c4);
    expect(result2.re).toBeCloseTo(1);
    expect(result2.im).toBeCloseTo(1);
  });
});