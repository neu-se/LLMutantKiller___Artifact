import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow mutation detection", () => {
  it("should correctly compute i^2 as -1, not 0", () => {
    // i^2 = -1
    // base: a=0, b=1 (imaginary unit i)
    // exponent: z.re=2, z.im=0
    // Original: condition (a===0 && b===0) is false since b=1, so computes normally -> -1
    // Mutated: condition (a===0 && true) is true, returns ZERO -> 0
    const base = new Complex(0, 1); // i
    const result = base.pow(2);
    
    expect(result.re).toBeCloseTo(-1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});