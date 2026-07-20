import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should clone correctly', () => {
    const original = new Complex(1, 2);
    const clone = original.clone();
    expect(clone.re).toBe(1);
    expect(clone.im).toBe(2);
    original.re = 3;
    original.im = 4;
    expect(clone.re).toBe(1);
    expect(clone.im).toBe(2);
    expect(clone).not.toBe(original);
  });
});