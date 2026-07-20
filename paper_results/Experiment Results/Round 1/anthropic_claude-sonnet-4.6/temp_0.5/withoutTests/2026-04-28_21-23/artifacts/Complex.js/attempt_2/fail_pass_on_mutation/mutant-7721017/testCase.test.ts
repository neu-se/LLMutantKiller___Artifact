import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should correctly compute (i)^1 as i, not zero", () => {
    // Base: 0 + 1i (a=0, b=1)
    // Exponent: 1 (z.re=1, z.im=0)
    // Original: a===0 && b===0 → false (b=1), so computes normally → result is i
    // Mutated: a===0 && true && z.re>0 && z.im>=0 → true → returns ZERO incorrectly
    const base = new Complex(0, 1);
    const result = base.pow(new Complex(1, 0));
    
    // (0 + i)^1 = i, so re=0, im=1
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});