import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing validation", () => {
  it("should throw SyntaxError when parsing a string with two consecutive numbers without an operator", () => {
    expect(() => new Complex("1 2")).toThrow(SyntaxError);
  });
});