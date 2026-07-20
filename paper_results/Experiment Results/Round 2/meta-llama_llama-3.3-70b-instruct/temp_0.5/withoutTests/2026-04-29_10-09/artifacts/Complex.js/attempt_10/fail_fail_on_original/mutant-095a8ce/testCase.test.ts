import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for asec when input is a complex number', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(Infinity);
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});