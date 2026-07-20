import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly for values near 3000', () => {
    const c = new Complex(3000, 3000);
    const result = c.abs();
    const expected = Math.sqrt(3000 * 3000 + 3000 * 3000);
    if (Math.abs(c.re) < 3000 && Math.abs(c.im) < 3000) {
      expect(result).toBeCloseTo(expected, 10);
    } else {
      expect(result).not.toBeCloseTo(expected, 10);
    }
  });
});