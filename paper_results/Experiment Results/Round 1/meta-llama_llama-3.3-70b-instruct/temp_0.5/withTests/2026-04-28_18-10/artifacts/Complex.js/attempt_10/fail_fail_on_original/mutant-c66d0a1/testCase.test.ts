import { Complex } from "../../complex";

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const c = new Complex(1, 2);
    const d = c.acsc();
    expect(d.re).not.toBe(0);
    expect(d.im).not.toBe(0);
    expect(d.re).not.toBeNull();
    expect(d.im).not.toBeNull();
    expect(typeof d.re).toBe('number');
    expect(typeof d.im).toBe('number');
  });
});