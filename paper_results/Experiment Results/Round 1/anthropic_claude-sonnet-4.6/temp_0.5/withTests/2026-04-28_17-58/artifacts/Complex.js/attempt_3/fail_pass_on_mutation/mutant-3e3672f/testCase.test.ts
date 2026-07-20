import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse a complex number string with uppercase I without throwing", () => {
    // Original code handles 'I' as imaginary unit
    // Mutated code does not recognize 'I', causing parser_exit() to throw SyntaxError
    expect(() => new Complex("1+2I")).not.toThrow();
  });
});