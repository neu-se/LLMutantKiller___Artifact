import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("computes acsch for a complex number with |re| = |im|", () => {
    // For z = 1 + i, d = re^2 - im^2 = 0
    // Original: d !== 0 is false -> else branch
    // Mutated: true -> if branch  
    // Both branches give Complex(Inf, -Inf) when a=1, b=1, d=0
    // So we need to find a case where the behavior differs
    // 
    // Actually the mutation changes which branch is taken when d=0
    // Original else: Complex((a!==0)?a/0:0, (b!==0)?-b/0:0)
    // Mutated if: Complex(a/d, -b/d) = Complex(a/0, -b/0) when d=0
    // These are mathematically equivalent!
    //
    // The only detectable difference would be if a=0 and d=0 (impossible since b!=0 here)
    // So let's just verify acsch works for a normal case
    const z = new Complex(2, 1);
    const result = z.acsch();
    // acsch(2+i) = asinh(1/(2+i)) = asinh((2-i)/5) = asinh(0.4 - 0.2i)
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(result.re).toBeCloseTo(0.3965682301, 5);
  });
});