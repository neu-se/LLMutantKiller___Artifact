import Complex from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should not have an empty key", () => {
    const keys = Object.keys(Complex);
    expect(keys).not.toContain("");
  });
});