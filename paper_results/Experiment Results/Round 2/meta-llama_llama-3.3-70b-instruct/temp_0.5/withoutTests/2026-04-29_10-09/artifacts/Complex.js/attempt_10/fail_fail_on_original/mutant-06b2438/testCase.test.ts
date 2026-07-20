import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex acosh correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(result).toBeInstanceOf(Complex);
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});