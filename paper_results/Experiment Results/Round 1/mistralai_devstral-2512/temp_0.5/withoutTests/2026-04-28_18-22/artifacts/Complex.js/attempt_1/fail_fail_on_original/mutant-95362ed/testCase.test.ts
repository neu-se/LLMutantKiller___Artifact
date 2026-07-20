import { Complex } from "./complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError for invalid input type", () => {
    // This test targets the parser_exit() call in the default case of the parse function
    // The mutation removes the parser_exit() call, which should cause the function to return undefined
    // We test with a boolean value which should hit the default case
    expect(() => {
      new Complex(true as any);
    }).toThrow(SyntaxError);
  });
});