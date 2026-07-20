import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs", () => {
  it("abs of complex with large values where re equals im", () => {
    // Use a value that's definitely in the large-value path
    // and where re === im exactly
    const val = 5000;
    const c = new Complex(val, val);
    // Both branches give val * sqrt(2)
    // But maybe there's a floating-point difference?
    expect(c.abs()).toBeCloseTo(val * Math.SQRT2, 10);
  });
});