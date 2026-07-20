import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers for equality', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(1, 1);
    const c3 = new Complex(1, 1.000001);
    expect(c1.equals(c2)).toBe(true);
    expect(c1.equals(c3)).toBe(true);
  });
});