import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const c1 = new Complex(1, 0);
    const c2 = new Complex(1, 0);
    expect(c1.equals(c2)).toBe(true);
    const c3 = new Complex(2, 0);
    expect(c1.equals(c3)).toBe(false);
  });
});