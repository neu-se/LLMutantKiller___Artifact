import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return a complex number when calling ceil on a complex number', () => {
    const complex = new Complex(1.2, 3.4);
    const result = complex.ceil(1);
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
  });
});