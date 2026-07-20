import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should have an acot function that returns a complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
  });
});