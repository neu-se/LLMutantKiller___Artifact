import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly compare two complex numbers for equality', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(1, 2);
    expect(c1.equals(c2)).toBe(false);
  });
});