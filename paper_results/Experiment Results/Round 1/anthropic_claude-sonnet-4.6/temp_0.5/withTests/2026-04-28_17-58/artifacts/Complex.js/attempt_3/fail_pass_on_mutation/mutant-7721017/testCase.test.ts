import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow mutation", () => {
  it("should compute (2i)^2 correctly as -4, not zero", () => {
    // base: 0 + 2i (re=0, im=2), exponent: 2 (re=2, im=0)
    // Mutated condition: a===0 && true && z.re>0 && z.im>=0 => true => returns ZERO
    // Original condition: a===0 && b===0 fails since b=2, proceeds to compute -4
    const base = new Complex(0, 2);
    const result = base.pow(new Complex(2, 0));
    
    expect(result.re).toBeCloseTo(-4, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});