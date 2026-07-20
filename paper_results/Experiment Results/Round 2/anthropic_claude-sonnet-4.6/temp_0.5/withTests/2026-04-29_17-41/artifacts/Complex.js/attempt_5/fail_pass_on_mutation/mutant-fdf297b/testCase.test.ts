import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method infinity behavior", () => {
  it("should return INFINITY when only one operand is infinite", () => {
    // The PLACEHOLDER is the second check in sub (which returns INFINITY)
    // Original (||): when only one operand is infinite, returns INFINITY
    // Mutated (&&): when only one operand is infinite, falls through to arithmetic,
    //               producing NaN (e.g., Infinity - 1 = Infinity but re/im arithmetic gives NaN-like result)
    
    const inf = Complex.INFINITY; // re=Infinity, im=Infinity
    const finite = new Complex(2, 3);
    
    // The first check in sub returns NaN for Infinity - Infinity (both infinite)
    // For one infinite: original second check (||) returns INFINITY
    // For one infinite: mutated second check (&&) falls through to arithmetic
    const result = finite.sub(inf);
    
    expect(result.isInfinite()).toBe(true);
  });
});