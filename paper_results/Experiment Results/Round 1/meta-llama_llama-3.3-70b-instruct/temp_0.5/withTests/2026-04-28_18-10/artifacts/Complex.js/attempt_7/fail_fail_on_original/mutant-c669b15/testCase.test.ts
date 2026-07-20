import { Complex } from '../complex';

describe('Complex.js', () => {
  it('should correctly calculate division of complex numbers', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(1, -1);
    const result = c1.div(c2);
    expect(result.re).toBeCloseTo(0.5, 10);
    expect(result.im).toBeCloseTo(0.5, 10);

    const c3 = new Complex(1, 1);
    const c4 = new Complex(1, 1);
    const result2 = c3.div(c4);
    expect(result2.re).toBeCloseTo(1, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});