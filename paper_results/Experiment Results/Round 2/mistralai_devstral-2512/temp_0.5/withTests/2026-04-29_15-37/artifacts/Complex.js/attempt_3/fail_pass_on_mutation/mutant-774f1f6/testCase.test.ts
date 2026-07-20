import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing edge cases", () => {
  it("should handle empty string input gracefully", () => {
    expect(() => new Complex("")).toThrow(SyntaxError);
  });
});