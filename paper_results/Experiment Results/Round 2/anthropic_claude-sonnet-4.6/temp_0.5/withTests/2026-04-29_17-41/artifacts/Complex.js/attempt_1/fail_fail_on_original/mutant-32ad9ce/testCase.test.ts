import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN validation", () => {
  it("should throw when only the real part is NaN", () => {
    // With original code (||): throws because re is NaN
    // With mutated code (&&): does NOT throw because im is not NaN
    expect(() => {
      new Complex({ re: NaN, im: 0 });
    }).toThrow(SyntaxError);
  });
});