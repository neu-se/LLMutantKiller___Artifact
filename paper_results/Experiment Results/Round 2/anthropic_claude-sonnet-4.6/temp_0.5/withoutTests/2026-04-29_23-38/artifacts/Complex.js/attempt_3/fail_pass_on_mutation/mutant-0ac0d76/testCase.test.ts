import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow function with real base and exponent", () => {
  it("should correctly compute pow of positive real base with real exponent", () => {
    // pow: if (b === 0 && a > 0) returns new Complex(Math.pow(a, z['re']), 0)
    // Original: 2^3 = 8 exactly via Math.pow
    // Mutated: 2^3 falls through to general formula using exp/log which may differ slightly
    const base = new Complex(2, 0);
    const result = base.pow(new Complex(3, 0));
    
    expect(result.re).toBe(8);
    expect(result.im).toBe(0);
  });
});