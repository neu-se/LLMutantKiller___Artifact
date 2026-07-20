import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return a complex number when adding two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 4);
    const result = c1.add(c2);
    expect(result.re).toBe(4);
    expect(result.im).toBe(6);
  });
});