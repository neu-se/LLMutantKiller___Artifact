import { Complex } from '../complex';

describe('Complex', () => {
  it('should handle acsc correctly', () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    const expected = c.clone().div(c.abs()).asin();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});