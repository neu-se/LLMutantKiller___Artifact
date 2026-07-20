import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with invalid operator sequence", () => {
  it("should throw SyntaxError for input with consecutive operators without numbers", () => {
    expect(() => new Complex("+-i")).toThrow(SyntaxError);
  });
});