import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parse NaN handling", () => {
  it("should throw SyntaxError when only one component is NaN (re is NaN, im is valid)", () => {
    // When parsing an object where only re is NaN (im is valid number),
    // the original code checks: isNaN(re) || isNaN(im) -> throws
    // The mutated code checks: isNaN(re) && isNaN(im) -> does NOT throw
    // We can trigger this by passing an object with NaN re and valid im
    expect(() => {
      new Complex({ re: NaN, im: 5 });
    }).toThrow(SyntaxError);
  });
});