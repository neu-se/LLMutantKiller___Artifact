import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should correctly compute 0^(1+i) as ZERO only when base is exactly 0+0i", () => {
    // Base: 0 + 2i (a=0, b=2), Exponent: 1+1i (z.re=1, z.im=1)
    // z['im'] !== 0, so we skip that block entirely
    // Original: a===0 && b===0 → false (b=2), computes normally
    // Mutated: a===0 && true && z.re>0 && z.im>=0 → true → returns ZERO incorrectly
    const base = new Complex(0, 2);
    const result = base.pow(new Complex(1, 1));
    
    // Should NOT be zero - (2i)^(1+i) is a non-zero complex number
    const isZero = result.re === 0 && result.im === 0;
    expect(isZero).toBe(false);
  });
});