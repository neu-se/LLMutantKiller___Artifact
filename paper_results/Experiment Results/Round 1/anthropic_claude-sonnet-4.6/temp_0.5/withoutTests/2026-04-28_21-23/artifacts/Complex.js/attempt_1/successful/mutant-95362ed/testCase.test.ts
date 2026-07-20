import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parser with invalid type", () => {
  it("should throw SyntaxError when passing an invalid type like boolean", () => {
    expect(() => {
      new Complex(true as any);
    }).toThrow(SyntaxError);
  });
});