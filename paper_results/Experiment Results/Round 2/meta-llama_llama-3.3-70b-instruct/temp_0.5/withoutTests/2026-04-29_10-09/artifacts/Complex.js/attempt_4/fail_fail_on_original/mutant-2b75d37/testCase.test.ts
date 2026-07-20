import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when acot is called without implementation', () => {
    const complex = new Complex(1, 2);
    expect(complex.acot).toThrowError();
  });
});