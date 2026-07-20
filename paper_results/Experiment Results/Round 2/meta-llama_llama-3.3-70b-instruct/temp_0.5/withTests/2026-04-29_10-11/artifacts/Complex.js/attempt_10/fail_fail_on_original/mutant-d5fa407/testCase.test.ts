import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when calculating acot for b = 0 and a = 0', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acot()).toThrowError();
  });
});