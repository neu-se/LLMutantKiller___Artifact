import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("returns NaN for inputs where d underflows to zero with nonzero b", () => {
    const c = new Complex(1e-200, 1e-200);
    const result = c.acsch();
    expect(result.isNaN()).toBe(true);
  });
});