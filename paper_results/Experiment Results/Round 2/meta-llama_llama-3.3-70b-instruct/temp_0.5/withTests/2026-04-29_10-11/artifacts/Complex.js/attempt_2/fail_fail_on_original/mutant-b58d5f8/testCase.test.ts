import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when parsing an invalid string', () => {
    expect(() => new Complex('')).not.toThrow();
    expect(new Complex('')).toEqual(new Complex(NaN, NaN));
  });
});