import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError when parsing string with no valid number tokens", () => {
    expect(() => {
      new Complex("abc");
    }).toThrow(SyntaxError);
  });
});