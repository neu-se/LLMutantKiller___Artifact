import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError for invalid input type", () => {
    expect(() => {
      new Complex(true as any);
    }).toThrow(SyntaxError);
  });
});