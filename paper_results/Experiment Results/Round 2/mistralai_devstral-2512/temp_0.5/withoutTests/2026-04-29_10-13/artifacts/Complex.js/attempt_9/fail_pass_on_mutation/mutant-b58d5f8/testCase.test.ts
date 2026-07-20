import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError when parsing string with invalid regex pattern", () => {
    // This test targets the case where the regex match fails and returns null
    // The mutation removes the parser_exit() call when tokens is null
    expect(() => {
      new Complex("++");
    }).toThrow(SyntaxError);
  });
});