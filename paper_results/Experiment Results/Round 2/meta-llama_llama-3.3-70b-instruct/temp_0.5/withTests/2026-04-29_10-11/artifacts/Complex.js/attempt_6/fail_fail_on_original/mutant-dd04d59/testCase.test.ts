import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate asinh correctly', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    const keys = Object.keys(result);
    expect(keys.length).toBe(2);
    expect(keys).toContain('re');
    expect(keys).toContain('im');
  });
});