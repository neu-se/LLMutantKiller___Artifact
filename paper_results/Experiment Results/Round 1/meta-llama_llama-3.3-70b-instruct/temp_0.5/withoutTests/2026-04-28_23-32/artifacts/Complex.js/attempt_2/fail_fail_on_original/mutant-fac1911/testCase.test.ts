import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error for acsch when denominator is zero', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsch()).toThrow();
  });
});