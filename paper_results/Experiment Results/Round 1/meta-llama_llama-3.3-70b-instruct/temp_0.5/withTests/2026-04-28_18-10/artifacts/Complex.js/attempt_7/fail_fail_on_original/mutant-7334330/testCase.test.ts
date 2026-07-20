import { Complex } from '../../../complex';

describe('Complex', () => {
  it('should correctly divide two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 4);
    const result = c1.div(c2);
    const expectedRe = (1 * 3 + 2 * 4) / (3 * 3 + 4 * 4);
    const expectedIm = (2 * 3 - 1 * 4) / (3 * 3 + 4 * 4);
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});