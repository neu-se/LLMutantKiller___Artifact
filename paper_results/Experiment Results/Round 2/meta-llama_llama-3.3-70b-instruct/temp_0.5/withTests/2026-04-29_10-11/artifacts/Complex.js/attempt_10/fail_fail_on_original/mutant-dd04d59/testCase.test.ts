import { Complex } from "../complex";

describe('Complex', () => {
  it('should calculate asinh correctly', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});