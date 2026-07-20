import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN parse mutation", () => {
  it("should throw SyntaxError for object with only im as NaN", () => {
    // If original: || means enters block when EITHER is NaN
    // If block has parser_exit() (not commented in original):
    // Original throws when either is NaN
    // Mutant only throws when BOTH are NaN
    // So {re: 0, im: NaN}: original throws, mutant does NOT throw
    expect(() => {
      new Complex({ re: 0, im: NaN });
    }).toThrow(SyntaxError);
  });
});