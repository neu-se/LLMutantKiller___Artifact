import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError when parsing null input", () => {
    expect(() => {
      new Complex(null);
    }).toThrow(SyntaxError);
  });
});