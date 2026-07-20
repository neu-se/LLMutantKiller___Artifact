import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate asech for non-zero real part', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(0, 0);
    expect(complex2.asech().re).toBeCloseTo(Infinity, 10);
  });
});