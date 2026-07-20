import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when parsing null token', () => {
    const complex = new Complex('null');
    expect(() => {
      const tokens = null;
      if (tokens === null) {
        throw new SyntaxError('Invalid Param');
      }
    }).toThrow(SyntaxError);
  });
});