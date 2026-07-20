import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow mutation detection", () => {
  it("should correctly compute i^2 = -1, not 0", () => {
    // Base: i (re=0, im=1), Exponent: 2 (re=2, im=0)
    // Original: a===0 && b===0 check prevents early return since b=1 !== 0
    // Mutated: a===0 && true check causes early return of ZERO incorrectly
    const base = new Complex(0, 1); // i
    const result = base.pow(2);
    
    // i^2 = -1
    expect(result.re).toBeCloseTo(-1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});