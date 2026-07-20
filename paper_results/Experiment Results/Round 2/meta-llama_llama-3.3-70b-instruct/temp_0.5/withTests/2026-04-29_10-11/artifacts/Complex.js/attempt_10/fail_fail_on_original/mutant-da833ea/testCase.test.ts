import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for asech with mutation', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(0.5, -0.5);
    const result2 = complex2.asech();
    expect(result2.re).not.toBeCloseTo(result.re, 10);
    expect(result2.im).not.toBeCloseTo(result.im, 10);
  });
});