import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should calculate the complex atanh correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.atanh();
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
    expect(Object.keys(result)).toEqual(['re', 'im']);
  });
});