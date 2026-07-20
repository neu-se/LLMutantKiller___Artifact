import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parser default case", () => {
  it("should throw SyntaxError when given an invalid type like boolean", () => {
    expect(() => {
      new Complex(true as any);
    }).toThrow(SyntaxError);
  });
});