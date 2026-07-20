import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parse NaN detection", () => {
  it("should throw SyntaxError when only the real part is NaN (imaginary is valid)", () => {
    // When parsing an object with re: NaN and im: 0, only re is NaN.
    // Original: isNaN(re) || isNaN(im) => true => throws SyntaxError
    // Mutated:  isNaN(re) && isNaN(im) => false (im is 0, not NaN) => no throw
    expect(() => {
      new Complex({ re: NaN, im: 0 });
    }).toThrow(SyntaxError);
  });
});