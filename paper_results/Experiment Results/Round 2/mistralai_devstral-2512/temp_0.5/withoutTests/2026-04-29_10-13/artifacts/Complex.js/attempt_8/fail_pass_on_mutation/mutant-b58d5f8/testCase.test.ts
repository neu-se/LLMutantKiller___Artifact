import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError when parsing string with invalid tokens that result in null match", () => {
    // This test targets the specific case where tokens.match() returns null
    // which would trigger the mutated code path
    expect(() => {
      new Complex("i+");
    }).toThrow(SyntaxError);
  });
});