import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parser trailing operator validation", () => {
  it("should throw SyntaxError when string ends with a minus sign", () => {
    expect(() => new Complex('3-')).toThrow(SyntaxError);
  });
});