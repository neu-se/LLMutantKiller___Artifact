import { Complex } from "./complex.js";

describe('Complex number parsing', () => {
  it('should throw an error for invalid input', () => {
    expect(() => new Complex({ foo: 'bar' })).toThrowError(SyntaxError);
  });
});