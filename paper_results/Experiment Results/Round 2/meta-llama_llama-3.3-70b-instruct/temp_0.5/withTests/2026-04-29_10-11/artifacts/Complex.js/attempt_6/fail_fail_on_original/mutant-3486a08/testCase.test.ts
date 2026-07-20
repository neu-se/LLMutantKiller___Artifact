import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly compare two complex numbers for equality', () => {
    const c1 = new Complex(1.0, 1.0);
    const c2 = new Complex(1.0, 1.0);
    const c3 = new Complex(1.0, 2.0);

    expect(c1.equals(c2)).toBe(true);
    expect(c1.equals(c3)).toBe(false);
    expect(c1.equals(c1)).toBe(true);
    expect(c2.equals(c2)).toBe(true);
    expect(c1.equals(c3)).toBe(false);
    expect(c1.equals(new Complex(1.000001, 1.0))).toBe(true);
  });
});