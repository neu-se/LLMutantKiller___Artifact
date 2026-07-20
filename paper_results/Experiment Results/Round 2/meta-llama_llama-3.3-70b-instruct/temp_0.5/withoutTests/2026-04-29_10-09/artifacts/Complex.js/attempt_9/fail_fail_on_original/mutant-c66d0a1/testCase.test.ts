import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex acsc correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});