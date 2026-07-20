import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with boolean input", () => {
  it("should throw SyntaxError when parsing boolean input", () => {
    expect(() => new Complex(true)).toThrow(SyntaxError);
  });
});