import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError when parsing uppercase 'I' in mutated code", () => {
    expect(() => new Complex("1+2I")).toThrow(SyntaxError);
  });
});