import { Complex } from "./complex";

describe('Complex', () => {
  it('should clone correctly', () => {
    const original = new Complex(1, 2);
    const clone = original.clone();
    expect(clone.re).toBe(original.re);
    expect(clone.im).toBe(original.im);
    original.re = 3;
    original.im = 4;
    expect(clone.re).toBe(1);
    expect(clone.im).toBe(2);
  });
});