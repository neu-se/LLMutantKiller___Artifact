import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should handle acsc correctly', () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const a = c.re;
    const b = c.im;
    const d = a * a + b * b;
    const expectedRe = (a !== 0) ? a / d : 0;
    const expectedIm = (b !== 0) ? -b / d : 0;
    const expected = new Complex(expectedRe, expectedIm).asin();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});