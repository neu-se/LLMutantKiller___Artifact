import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when parsing null token', () => {
    expect(() => {
      const complex = new Complex(null);
      const tokens = complex.toString().match(/\d+\.?\d*e[+-]?\d|\d+\.?\d*|\.\d+|./g);
      if (tokens === null) {
        throw new SyntaxError('Invalid Param');
      }
    }).toThrow(SyntaxError);
  });
});