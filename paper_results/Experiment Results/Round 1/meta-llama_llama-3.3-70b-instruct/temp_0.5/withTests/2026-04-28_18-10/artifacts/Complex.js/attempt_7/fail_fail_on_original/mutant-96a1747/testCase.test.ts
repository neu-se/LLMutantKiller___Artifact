import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex atanh', () => {
    const complex = new Complex(1.5, 0);
    const result = complex.atanh();
    expect(Object.keys(result)).toEqual(['re', 'im']);
  });
});