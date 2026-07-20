import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs", () => {
  it("abs of complex number with large components", () => {
    // Test the overflow-safe hypot path
    expect(new Complex(5000, 3000).abs()).toBeCloseTo(Math.sqrt(5000*5000 + 3000*3000), 10);
    expect(new Complex(3000, 5000).abs()).toBeCloseTo(Math.sqrt(3000*3000 + 5000*5000), 10);
  });
});