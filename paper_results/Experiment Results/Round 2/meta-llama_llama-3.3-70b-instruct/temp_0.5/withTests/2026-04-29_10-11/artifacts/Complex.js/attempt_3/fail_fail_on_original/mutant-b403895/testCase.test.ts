import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly calculate asec for complex numbers', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const complex2 = new Complex(0, 1);
    const result2 = complex2.asec();
    expect(result2.re).not.toBeNaN();
    expect(result2.im).not.toBeNaN();
    expect(result.re).not.toBeCloseTo(result2.re);
    expect(result.im).not.toBeCloseTo(result2.im);
  });
});