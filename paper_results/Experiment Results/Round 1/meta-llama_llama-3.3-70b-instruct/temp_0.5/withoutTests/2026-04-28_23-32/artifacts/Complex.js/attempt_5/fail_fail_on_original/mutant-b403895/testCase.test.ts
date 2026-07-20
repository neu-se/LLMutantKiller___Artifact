import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.asec();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(Infinity, 10);
  });
});