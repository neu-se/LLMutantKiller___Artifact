import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly divide two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(1, 1);
    const result = c1.div(c2);
    const expectedRe = (1 * 1 + 2 * 1) / (1 * 1 + 1 * 1);
    const expectedIm = (2 * 1 - 1 * 1) / (1 * 1 + 1 * 1);
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});