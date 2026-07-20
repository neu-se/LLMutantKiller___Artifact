import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN validation", () => {
  it("should throw SyntaxError when only the imaginary part is NaN", () => {
    // Original (||): throws because im is NaN (even though re is not)
    // Mutated (&&): does NOT throw because re is not NaN
    expect(() => {
      new Complex(1, NaN);
    }).toThrow(SyntaxError);
  });
});