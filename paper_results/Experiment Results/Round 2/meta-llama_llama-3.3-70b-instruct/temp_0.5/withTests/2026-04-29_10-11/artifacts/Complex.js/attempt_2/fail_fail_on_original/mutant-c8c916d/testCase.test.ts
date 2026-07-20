import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should handle acsc correctly', () => {
    const a = 1;
    const b = 1;
    const c = new Complex(a, b);
    const result = c.acsc();
    const expected = new Complex(a / (a * a + b * b), -b / (a * a + b * b)).asin();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});