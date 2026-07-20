import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate hypot correctly for values near 3000', () => {
    const c = new Complex(3000, 2999);
    const result = c.abs();
    const expected = Math.sqrt(3000 * 3000 + 2999 * 2999);
    expect(result).toBeCloseTo(expected, 10);
    const d = new Complex(3000, 3000);
    const result2 = d.abs();
    const expected2 = Math.sqrt(3000 * 3000 + 3000 * 3000);
    expect(result2).toBeCloseTo(expected2, 10);
  });
});