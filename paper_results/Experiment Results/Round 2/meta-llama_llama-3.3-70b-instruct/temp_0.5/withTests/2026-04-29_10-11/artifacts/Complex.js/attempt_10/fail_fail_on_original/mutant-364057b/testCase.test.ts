import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate asech for zero real part', () => {
    const complex = new Complex(0, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(Infinity, 10);
    const complex2 = new Complex(1, 0);
    const result2 = complex2.asech();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});