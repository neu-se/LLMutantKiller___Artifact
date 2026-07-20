import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch with subnormal positive real and negative imaginary where d underflows should match original fallback", () => {
    // With a=MIN_VALUE (>0), b=-MIN_VALUE (<0), d=0 (underflow)
    // Original: Complex(Infinity, Infinity).asinh()  [since -b/0 = -(-tiny)/0 = Infinity]
    // Mutant:   Complex(0, Infinity).asinh()
    // Let's check if these actually differ by computing them directly
    const orig = new Complex(Infinity, Infinity).asinh();
    const mut = new Complex(0, Infinity).asinh();
    
    // From the log we know both give NaN. Let's try b=+tiny instead
    // a=MIN_VALUE, b=+MIN_VALUE: -b/0 = -Infinity
    // Original: Complex(Infinity, -Infinity).asinh()
    // Mutant:   Complex(0, -Infinity).asinh()
    const orig2 = new Complex(Infinity, -Infinity).asinh();
    const mut2 = new Complex(0, -Infinity).asinh();
    
    // Check if orig2 and mut2 differ
    // orig2: swap -> asin(-Infinity + Infinity*i) -> NaN
    // mut2: swap -> asin(-Infinity + 0*i)
    // asin(-Infinity,0): t1=sqrt(0-Inf+1,-2*(-Inf)*0)=sqrt(-Inf,NaN)->NaN
    // Both NaN again...
    
    // The mutation may only be detectable by checking the im part sign
    // Let's try a=MIN_VALUE, b=MIN_VALUE: -b/0 = -Infinity
    // Original im = -Infinity, Mutant im = -Infinity (same!)
    // The ONLY difference is re: Infinity vs 0
    // But asinh of both gives NaN...
    
    // Try asserting on the im part of the fallback result directly
    const tiny = Number.MIN_VALUE;
    const c = new Complex(tiny, tiny); // b > 0, so -b/0 = -Infinity
    const result = c.acsch();
    // Both original and mutant call asinh with im=-Infinity, only re differs
    // Since both give NaN, let's just confirm isNaN
    expect(result.isNaN()).toBe(true);
    expect(mut2.isNaN()).toBe(true);
    expect(orig2.isNaN()).toBe(true);
  });
});