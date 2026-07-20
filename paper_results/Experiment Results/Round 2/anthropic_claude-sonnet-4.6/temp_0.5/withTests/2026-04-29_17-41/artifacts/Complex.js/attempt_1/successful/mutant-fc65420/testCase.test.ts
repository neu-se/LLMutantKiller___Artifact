import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should return the correct value for acsch of a real non-zero number", () => {
    // acsch(1) = log(1 + sqrt(1^2 + 1)) = log(1 + sqrt(2))
    const result = new Complex(1, 0).acsch();
    const expected = Math.log(1 + Math.sqrt(2));
    
    // Original code: (a !== 0) ? Math.log(a + sqrt(a*a+1)) : Infinity
    // For a=1, b=0: returns Math.log(1 + sqrt(2)) ≈ 0.8814
    // Mutated code: (a === 0) ? Math.log(a + sqrt(a*a+1)) : Infinity
    // For a=1, b=0: returns Infinity (wrong!)
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBe(0);
    expect(isFinite(result.re)).toBe(true);
  });
});