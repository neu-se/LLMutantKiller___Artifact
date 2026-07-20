import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("inverse of zero should have re === Infinity", () => {
    const result = new Complex(0, 0).inverse();
    expect(result.re === Infinity).toBe(true);
  });
});