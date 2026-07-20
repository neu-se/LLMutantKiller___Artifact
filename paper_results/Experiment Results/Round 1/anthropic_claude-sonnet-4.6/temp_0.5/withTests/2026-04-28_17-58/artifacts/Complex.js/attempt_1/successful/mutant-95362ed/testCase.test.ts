import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parser with invalid input type", () => {
  it("should throw a SyntaxError when passed an invalid type like a boolean", () => {
    expect(() => {
      new Complex(true as any);
    }).toThrow(SyntaxError);
  });
});