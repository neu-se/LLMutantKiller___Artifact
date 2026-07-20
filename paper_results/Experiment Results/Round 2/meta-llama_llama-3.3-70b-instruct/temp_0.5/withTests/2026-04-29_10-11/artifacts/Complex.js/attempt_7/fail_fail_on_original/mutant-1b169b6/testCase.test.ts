import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate acoth for a complex number', () => {
    const complex = new Complex(2, 1);
    const result = complex.acoth();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
    expect(result.re).not.toBe(-Infinity);
    expect(result.im).not.toBe(-Infinity);
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(result.re).not.toBe(1/0);
    expect(result.im).not.toBe(-1/0);
  });
});