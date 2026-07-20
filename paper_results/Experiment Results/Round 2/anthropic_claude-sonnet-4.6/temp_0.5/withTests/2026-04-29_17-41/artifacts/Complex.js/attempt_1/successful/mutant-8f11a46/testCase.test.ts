import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing validation", () => {
  it("should throw SyntaxError when parsing a string with consecutive numbers without operators", () => {
    expect(() => {
      new Complex("1 2");
    }).toThrow(SyntaxError);
  });
});