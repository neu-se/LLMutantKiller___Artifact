import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log function", () => {
  it("should correctly compute log of a negative real number", () => {
    // log(-1) = 0 + πi
    // Original: a <= 0, b === 0 does NOT enter special branch, uses general formula
    // Mutated: a <= 0, b === 0 ENTERS special branch, returns Math.log(-1) = NaN
    const c = new Complex(-1, 0);
    const result = c.log();
    
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});