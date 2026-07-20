import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with trailing operators", () => {
  it("should throw SyntaxError when parsing a string with a trailing minus sign", () => {
    // In the original code: plus + minus > 0 catches trailing '-' (minus=1, plus=0 => 0+1=1 > 0 => throws)
    // In the mutated code: plus - minus > 0 does NOT catch trailing '-' (0-1=-1 > 0 is false => no throw)
    expect(() => new Complex("3-")).toThrow(SyntaxError);
  });
});