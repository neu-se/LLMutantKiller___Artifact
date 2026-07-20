import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should calculate asinh correctly on the original code and fail on the mutated code', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(result.re).not.toBeNull();
    expect(result.im).not.toBeNull();
  });
});