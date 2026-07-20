import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly multiply two complex numbers when both are real and not NaN', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBeCloseTo(6);
    expect(result.im).toBeCloseTo(0);
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});