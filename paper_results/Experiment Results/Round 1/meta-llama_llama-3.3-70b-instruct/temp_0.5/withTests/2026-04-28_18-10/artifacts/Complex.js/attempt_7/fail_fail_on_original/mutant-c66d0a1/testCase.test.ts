import { Complex } from "./complex";

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const c = new Complex(1, 2);
    const d = c.acsc();
    expect(d).not.toBeNull();
    expect(d.re).not.toBeUndefined();
    expect(d.im).not.toBeUndefined();
    expect(typeof d.re).toBe('number');
    expect(typeof d.im).toBe('number');
    expect(d.re).not.toEqual(0);
    expect(d.im).not.toEqual(0);
  });
});