import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError when parsing empty string", () => {
    expect(() => {
      new Complex("");
    }).toThrow(SyntaxError);
  });
});