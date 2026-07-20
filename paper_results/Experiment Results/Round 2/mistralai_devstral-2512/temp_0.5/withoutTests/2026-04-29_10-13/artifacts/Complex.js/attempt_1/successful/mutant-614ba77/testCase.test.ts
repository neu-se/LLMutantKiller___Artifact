import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js default export", () => {
  it("should have the correct default export", () => {
    // This test checks if the default export is correctly set to Complex
    // The mutation changes Complex['default'] = Complex to Complex[""] = Complex
    // We can detect this by checking if the default export exists and is Complex
    expect(Complex.default).toBe(Complex);
  });
});