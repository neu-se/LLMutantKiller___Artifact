import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with operator stack overflow", () => {
  it("should throw SyntaxError when operators remain on stack after parsing", () => {
    expect(() => new Complex("2+")).toThrow(SyntaxError);
  });
});