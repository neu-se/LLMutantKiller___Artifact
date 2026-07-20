import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for acsc when the implementation is correct', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    const expected = new Complex(-0.5403023058681398, 0.8414709848078965);
    expect(result.re).toBeCloseTo(expected.re, 5);
    expect(result.im).toBeCloseTo(expected.im, 5);
  });
});