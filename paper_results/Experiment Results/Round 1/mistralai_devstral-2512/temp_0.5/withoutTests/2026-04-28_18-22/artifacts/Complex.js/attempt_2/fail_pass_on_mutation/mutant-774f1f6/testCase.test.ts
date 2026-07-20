import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing edge case", () => {
  it("should handle empty string input gracefully", () => {
    expect(() => new Complex("")).toThrow(SyntaxError);
  });
});