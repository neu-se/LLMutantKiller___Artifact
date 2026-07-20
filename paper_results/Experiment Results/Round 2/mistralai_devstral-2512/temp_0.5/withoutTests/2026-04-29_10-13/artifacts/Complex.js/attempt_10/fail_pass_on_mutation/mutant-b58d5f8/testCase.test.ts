import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError when parsing string that results in null tokens", () => {
    // This specifically targets the case where tokens.match() returns null
    // by using a string that doesn't match the regex pattern at all
    expect(() => {
      new Complex("abc+def");
    }).toThrow(SyntaxError);
  });
});