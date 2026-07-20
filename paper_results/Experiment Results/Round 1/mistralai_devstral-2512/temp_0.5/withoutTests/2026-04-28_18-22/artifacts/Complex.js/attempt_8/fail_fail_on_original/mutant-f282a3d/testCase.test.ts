import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex number with empty string as imaginary unit", () => {
    expect(() => new Complex("1+2")).toThrow(SyntaxError);
  });
});