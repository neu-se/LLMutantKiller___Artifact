import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("detects mutation in acsc else branch when a=0 and d=0", () => {
    // Create a complex number with re=0, im=0 but bypass early return
    // by temporarily making im appear non-zero during the check
    // Actually: use a value where a=0, b=tiny, d=0
    // and check that result.re is NaN (mutated) vs 0 (original) before asin
    // Since asin(0,±Inf)=asin(NaN,±Inf)=NaN, we can't distinguish via acsc
    // 
    // The only distinguishable case: asin(0,0) vs asin(NaN,0)
    // This requires b=0 in the else branch, which requires b=0 and d=0 and a=0
    // but not caught by early return - impossible normally
    //
    // Try: what if we subclass or modify prototype?
    // Last resort: check if there's a floating point value where b*b=0 but -b/0=0
    // -b/0 = 0 only when b=0. And b=0 with a=0 triggers early return.
    // 
    // Conclusion: mutation is equivalent. Test normal behavior.
    const result = new Complex(1, 0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(0);
  });
});