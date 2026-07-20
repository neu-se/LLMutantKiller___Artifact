import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with purely imaginary base", () => {
  it("should return -1 when computing i^2 (0+1i)^2", () => {
    // (0 + i)^2 = -1
    // Original: a=0, b=1 (b !== 0), condition false, computes correctly → -1
    // Mutated: a=0, true, z.re=2>0, z.im=0>=0 → returns ZERO incorrectly
    const result = new Complex(0, 1).pow(new Complex(2, 0));
    
    expect(result.re).toBeCloseTo(-1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});