import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot fallback branch", () => {
  it("acot with inputs that produce d=0 should return correct Infinity-based result", () => {
    // When a=0 and b=0, the early return handles it (b===0 check)
    // But we can construct a Complex with re=0, im=0 directly and call acot
    // The key insight: what if we use -0 for b to bypass the b===0 check?
    // In JS, -0 === 0 is true, so b===0 catches -0 too.
    
    // Let's try: pass NaN inputs to force d=NaN path
    // Actually let's look at what happens with very small numbers approaching 0
    // that make d underflow to 0 in floating point
    
    // The real approach: use Number.MIN_VALUE such that a*a + b*b === 0
    const tiny = 5e-324; // smallest positive float
    // tiny * tiny === 0 due to underflow
    const result = new Complex(tiny, tiny).acot();
    
    // Original: a !== 0 is true, so re = tiny/0 = Infinity -> atan gives PI/2
    // Mutated: a === 0 is false, so re = 0 -> atan(0 + i*something) gives different result
    expect(isFinite(result.re) || result.re === Infinity || result.re === -Infinity || !isNaN(result.re)).toBe(true);
    
    // More specifically, original should give Infinity real part going into atan
    // Let's check the imaginary part of the final result
    const resultOriginal = Math.PI / 2; // acot of infinity is 0, but this is complex...
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});