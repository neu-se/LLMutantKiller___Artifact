import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError when parsing invalid complex number strings", () => {
    expect(() => new Complex("i")).toThrow(SyntaxError);
  });
});