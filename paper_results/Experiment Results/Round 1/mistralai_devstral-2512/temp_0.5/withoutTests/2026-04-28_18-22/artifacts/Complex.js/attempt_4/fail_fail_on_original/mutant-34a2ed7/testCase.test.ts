import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with invalid input", () => {
  it("should throw SyntaxError for input starting with operator without number", () => {
    expect(() => new Complex("+i")).toThrow(SyntaxError);
  });
});