import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth for a complex number', () => {
    const complex = new Complex(2, 1);
    const result = complex.acoth();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
    expect(result.re).not.toBe(-Infinity);
    expect(result.im).not.toBe(-Infinity);
  });
});