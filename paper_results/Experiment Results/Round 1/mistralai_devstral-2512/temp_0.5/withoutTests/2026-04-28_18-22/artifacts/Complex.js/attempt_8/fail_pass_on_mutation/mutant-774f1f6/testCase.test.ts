import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with empty object", () => {
  it("should throw SyntaxError when parsing empty object", () => {
    expect(() => new Complex({})).toThrow(SyntaxError);
  });
});