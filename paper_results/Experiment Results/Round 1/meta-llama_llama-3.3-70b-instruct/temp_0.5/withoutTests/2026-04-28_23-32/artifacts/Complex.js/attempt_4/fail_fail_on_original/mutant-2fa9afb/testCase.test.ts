import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex sinh correctly', () => {
    const c = new Complex(0, 0);
    const result = c.sinh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    const d = new Complex(1, 1);
    const result2 = d.sinh();
    expect(result2.re).not.toBe(0);
    expect(result2.im).not.toBe(0);
  });
});