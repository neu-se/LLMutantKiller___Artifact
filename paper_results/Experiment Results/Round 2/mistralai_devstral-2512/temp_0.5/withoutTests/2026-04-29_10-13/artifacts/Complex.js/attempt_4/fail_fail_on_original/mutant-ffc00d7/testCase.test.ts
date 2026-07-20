import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError when parsing invalid complex number string with no digits before imaginary unit", () => {
    expect(() => new Complex("+i")).toThrow(SyntaxError);
  });
});