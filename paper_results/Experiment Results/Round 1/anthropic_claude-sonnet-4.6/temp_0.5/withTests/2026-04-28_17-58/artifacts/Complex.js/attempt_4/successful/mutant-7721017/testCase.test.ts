import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow mutation detection", () => {
  it("should compute (2i)^(1+i) correctly, not return zero", () => {
    // base: 0 + 2i (re=0, im=2), exponent: 1+i (re=1, im=1)
    // z['im'] = 1 != 0, so the z['im']===0 branch is skipped
    // Mutated: a===0 && true && z.re>0 && z.im>=0 => returns ZERO
    // Original: a===0 && b===0 fails since b=2, proceeds to compute correctly
    const base = new Complex(0, 2);
    const exponent = new Complex(1, 1);
    const result = base.pow(exponent);
    
    // Should not be zero
    expect(result.re === 0 && result.im === 0).toBe(false);
  });
});