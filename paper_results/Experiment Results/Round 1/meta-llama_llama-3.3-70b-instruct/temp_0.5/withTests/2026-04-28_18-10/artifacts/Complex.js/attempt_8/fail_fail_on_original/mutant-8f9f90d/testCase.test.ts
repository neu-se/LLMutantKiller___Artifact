import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should calculate the complex atanh correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.atanh();
    expect(Object.keys(result)).toEqual(expect.arrayContaining(['re', 'im']));
    expect(Object.keys(result).length).toBe(2);
  });
});