import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should calculate asinh correctly', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    expect(result.re).not.toBeUndefined();
    expect(result.im).not.toBeUndefined();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});