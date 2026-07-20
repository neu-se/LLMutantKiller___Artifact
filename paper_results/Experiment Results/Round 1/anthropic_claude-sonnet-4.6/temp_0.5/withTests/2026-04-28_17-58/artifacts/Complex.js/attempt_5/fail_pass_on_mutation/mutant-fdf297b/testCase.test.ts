import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method", () => {
  it("should return Infinity when exactly one operand is infinite", () => {
    // Original second check uses ||: one infinite operand → Infinity
    // Mutated second check uses &&: one infinite operand → falls through to subtraction
    const inf = new Complex(Infinity, Infinity);
    const finite = new Complex(2, 3);
    
    // First check (||) catches both-infinite → NaN
    // finite - inf: first check doesn't trigger (this is not infinite)
    // Original second check (||): triggers → Infinity  
    // Mutated second check (&&): doesn't trigger → tries to compute 2-Inf = NaN result
    const result = finite.sub(inf);
    expect(result.isInfinite()).toBe(true);
  });
});