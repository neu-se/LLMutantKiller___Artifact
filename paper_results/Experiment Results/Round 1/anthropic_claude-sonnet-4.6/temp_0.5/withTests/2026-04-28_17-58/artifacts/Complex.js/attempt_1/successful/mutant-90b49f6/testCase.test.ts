import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with trailing signs", () => {
  it("should throw SyntaxError when parsing a string with a trailing minus sign", () => {
    // In the original code: plus + minus > 0 catches trailing '+' or '-'
    // In the mutated code: plus - minus > 0 only catches when plus > minus
    // A trailing '-' increments minus but not plus, so:
    //   original: 0 + 1 = 1 > 0 => throws SyntaxError
    //   mutated:  0 - 1 = -1 > 0 => false => does NOT throw
    expect(() => {
      new Complex("3-");
    }).toThrow(SyntaxError);
  });
});