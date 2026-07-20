import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError when parsing an invalid type", () => {
    // This test targets the mutation by ensuring parser_exit() is called for invalid types
    // The mutation removes the parser_exit() call, which would cause the function to return undefined
    // instead of throwing an error
    expect(() => {
      new Complex(Symbol("invalid"));
    }).toThrow(SyntaxError);
  });
});