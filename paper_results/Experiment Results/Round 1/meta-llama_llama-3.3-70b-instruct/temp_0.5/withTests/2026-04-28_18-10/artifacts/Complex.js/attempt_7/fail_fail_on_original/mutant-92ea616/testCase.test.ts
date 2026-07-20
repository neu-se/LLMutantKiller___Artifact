import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when d is zero', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acot()).toThrowError();
  });
});