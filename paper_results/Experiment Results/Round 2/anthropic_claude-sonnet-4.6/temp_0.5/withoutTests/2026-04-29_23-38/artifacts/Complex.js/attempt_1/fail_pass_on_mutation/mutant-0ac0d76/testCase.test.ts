import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log function", () => {
  it("should correctly compute log of a positive real number", () => {
    // log(a) where a > 0 and b === 0 should return (Math.log(a), 0)
    // Original: if (b === 0 && a > 0) -> returns new Complex(Math.log(a), 0)
    // Mutated: if (b === 0 && a <= 0) -> won't enter this branch for positive a
    const c = new Complex(Math.E, 0);
    const result = c.log();
    
    // log(e) = 1 + 0i
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});