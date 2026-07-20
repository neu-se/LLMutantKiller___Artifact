import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parser default case", () => {
  it("should throw a SyntaxError when given an invalid object type like a boolean", () => {
    expect(() => {
      new Complex(true as any);
    }).toThrow(SyntaxError);
  });
});