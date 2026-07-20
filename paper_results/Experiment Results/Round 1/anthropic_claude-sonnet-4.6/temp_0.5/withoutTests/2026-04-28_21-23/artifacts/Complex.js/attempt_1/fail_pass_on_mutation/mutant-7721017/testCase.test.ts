import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with purely imaginary base", () => {
  it("should correctly compute (0 + 1i)^2 as -1, not zero", () => {
    // Base: 0 + 1i (a=0, b=1)
    // Exponent: 2 (z.re=2, z.im=0)
    // Original condition: a===0 && b===0 && z.re>0 && z.im>=0 → false (b=1≠0)
    // Mutated condition: a===0 && true && z.re>0 && z.im>=0 → true → returns ZERO incorrectly
    const base = new Complex(0, 1);
    const result = base.pow(2);
    
    // (0 + i)^2 = i^2 = -1
    expect(result.re).toBeCloseTo(-1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});