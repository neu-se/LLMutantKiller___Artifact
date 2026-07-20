import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs", () => {
  it("abs of 3000+3000i", () => {
    expect(new Complex(3000, 3000).abs()).toBe(Math.sqrt(3000 * 3000 + 3000 * 3000));
  });
});