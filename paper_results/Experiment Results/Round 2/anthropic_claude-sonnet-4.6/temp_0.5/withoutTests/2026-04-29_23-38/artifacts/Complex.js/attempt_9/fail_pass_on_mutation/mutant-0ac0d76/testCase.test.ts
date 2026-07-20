import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with negative real base", () => {
  it("(-2)^0.5 should equal sqrt(2)*i", () => {
    const result = new Complex(-2, 0).pow(new Complex(0.5, 0));
    // Original: falls through to general formula, gives correct complex result
    // Mutated: enters a<=0 branch, returns Math.pow(-2, 0.5) = NaN
    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.sqrt(2), 10);
  });
});