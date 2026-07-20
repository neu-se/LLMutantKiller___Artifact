import { Complex } from "./complex.js";

describe("Complex.js", () => {
  it("should throw an error when parsing an invalid complex number", () => {
    expect(() => new Complex({})).toThrowError(SyntaxError);
  });
});