import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should handle addition of two complex numbers where one is infinite', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.add(c2);
    expect(result.equals(Complex['NAN'])).toBe(true);
  });
});