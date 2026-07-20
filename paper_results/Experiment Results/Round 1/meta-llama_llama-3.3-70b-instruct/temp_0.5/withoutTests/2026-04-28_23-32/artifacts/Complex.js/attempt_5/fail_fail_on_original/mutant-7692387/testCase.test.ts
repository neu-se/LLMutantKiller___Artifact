import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
    expect(Object.keys(result)).not.toContain('');
  });
});