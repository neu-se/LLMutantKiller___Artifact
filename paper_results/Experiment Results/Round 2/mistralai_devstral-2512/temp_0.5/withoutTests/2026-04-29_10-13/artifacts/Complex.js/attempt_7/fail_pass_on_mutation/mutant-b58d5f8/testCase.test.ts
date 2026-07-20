import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError when parsing string with unmatched operators", () => {
    expect(() => {
      new Complex("+");
    }).toThrow(SyntaxError);
  });
});