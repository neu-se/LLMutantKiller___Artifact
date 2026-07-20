import { Complex } from "./complex.js";

describe("Complex.js", () => {
  it("should throw an error when parsing an invalid complex number", () => {
    expect(() => {
      const complex = new Complex({});
      if (typeof complex.re === 'number' && typeof complex.im === 'number') {
        throw new Error('Expected a SyntaxError to be thrown');
      }
    }).toThrowError(SyntaxError);
  });
});