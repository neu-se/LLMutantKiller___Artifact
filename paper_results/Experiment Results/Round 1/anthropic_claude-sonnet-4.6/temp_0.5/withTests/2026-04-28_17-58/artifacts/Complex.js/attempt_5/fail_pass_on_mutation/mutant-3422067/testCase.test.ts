import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot", () => {
  it("abs matches Math.hypot for large values", () => {
    expect(new Complex(4000, 4000).abs()).toBe(Math.hypot(4000, 4000));
  });
});