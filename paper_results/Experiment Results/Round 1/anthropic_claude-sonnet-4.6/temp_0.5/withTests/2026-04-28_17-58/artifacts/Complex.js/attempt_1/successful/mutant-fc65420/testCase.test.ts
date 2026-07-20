import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should correctly compute acsch for a real non-zero number", () => {
    // acsch(1) = log(1 + sqrt(1^2 + 1)) = log(1 + sqrt(2))
    // Original: a !== 0 is true for a=1, so returns Math.log(a + Math.sqrt(a*a + 1))
    // Mutated: a === 0 is false for a=1, so returns Infinity (wrong)
    const result = new Complex(1, 0).acsch();
    const expected = Math.log(1 + Math.sqrt(2));
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBe(0);
    expect(isFinite(result.re)).toBe(true);
  });
});