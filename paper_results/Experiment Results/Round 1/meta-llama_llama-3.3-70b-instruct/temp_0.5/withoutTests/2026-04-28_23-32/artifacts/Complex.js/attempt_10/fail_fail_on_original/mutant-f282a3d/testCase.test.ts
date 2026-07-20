import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when parsing complex numbers with empty string suffix', () => {
    expect(() => new Complex('1+')).toThrow(SyntaxError);
  });
});