import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should correctly compute (2i)^3 as -8i, not zero", () => {
    // Base: 0 + 2i (a=0, b=2)
    // Exponent: 3 (z.re=3, z.im=0)
    // Original: a===0 && b===0 is false (b=2), computes normally → -8i
    // Mutated: a===0 && true && z.re>0 && z.im>=0 → true → returns ZERO
    const base = new Complex(0, 2);
    const result = base.pow(new Complex(3, 0));
    
    // (2i)^3 = 8i^3 = 8*(-i) = -8i
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeCloseTo(-8, 5);
  });
});