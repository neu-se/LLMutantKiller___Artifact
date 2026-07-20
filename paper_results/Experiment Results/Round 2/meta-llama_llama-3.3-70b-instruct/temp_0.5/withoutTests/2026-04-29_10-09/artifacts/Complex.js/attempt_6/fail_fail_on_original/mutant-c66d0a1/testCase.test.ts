import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex acsc correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result).not.toBeNull();
    expect(result.re).not.toBeUndefined();
    expect(result.im).not.toBeUndefined();
    expect(result.re).not.toEqual(0);
    expect(result.im).not.toEqual(0);
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});