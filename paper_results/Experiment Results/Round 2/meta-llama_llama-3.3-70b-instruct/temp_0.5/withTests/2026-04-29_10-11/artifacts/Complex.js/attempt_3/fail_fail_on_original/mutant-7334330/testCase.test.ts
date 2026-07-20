import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate the division of two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(2, 1);
    const result = c1.div(c2);
    expect(result.re).toBeCloseTo((c1.re * c2.re + c1.im * c2.im) / (c2.re * c2.re + c2.im * c2.im));
    expect(result.im).toBeCloseTo((c1.im * c2.re - c1.re * c2.im) / (c2.re * c2.re + c2.im * c2.im));
  });
});