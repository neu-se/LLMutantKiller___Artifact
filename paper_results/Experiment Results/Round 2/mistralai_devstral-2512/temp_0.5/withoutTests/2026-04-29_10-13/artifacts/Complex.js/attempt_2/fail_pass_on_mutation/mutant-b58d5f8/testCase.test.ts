import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError when parsing invalid complex number string", () => {
    expect(() => {
      new Complex("invalid");
    }).toThrow(SyntaxError);
  });
});