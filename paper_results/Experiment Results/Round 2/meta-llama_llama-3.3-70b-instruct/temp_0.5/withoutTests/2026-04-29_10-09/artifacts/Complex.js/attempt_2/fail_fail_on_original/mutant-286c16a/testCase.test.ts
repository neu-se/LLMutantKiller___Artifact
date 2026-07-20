import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result).not.toEqual(new Complex());
  });
});