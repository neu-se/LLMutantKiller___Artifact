import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate the complex asech with asech(1) = 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(0.5, 0);
    const result2 = complex2.asech();
    expect(result2.re).toBeCloseTo(Math.log(1 + Math.sqrt(1 - 0.5 * 0.5)) / 0.5, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});