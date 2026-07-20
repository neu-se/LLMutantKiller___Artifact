import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should throw SyntaxError when two numbers appear without an operator between them", () => {
    // In the original code, when plus + minus === 0 before a numeric token,
    // it throws a SyntaxError. The mutation changes this condition to `false`,
    // so it would no longer throw in this case.
    expect(() => {
      new Complex('1 2');
    }).toThrow(SyntaxError);
  });
});