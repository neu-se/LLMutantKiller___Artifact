import { Complex } from "./complex.js";

describe('Complex Number Parser', () => {
  it('should throw an error when parsing an invalid complex number', () => {
    const invalidComplex = { foo: 'bar' };
    expect(() => new Complex(invalidComplex)).toThrow(SyntaxError);
  });
});