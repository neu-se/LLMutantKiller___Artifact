import { Complex } from "./complex.js";

describe('Complex Number Parser', () => {
  it('should throw an error for an invalid type', () => {
    const invalidComplex = { foo: 'bar' };
    expect(() => new Complex(invalidComplex)).toThrow(SyntaxError);
  });
});