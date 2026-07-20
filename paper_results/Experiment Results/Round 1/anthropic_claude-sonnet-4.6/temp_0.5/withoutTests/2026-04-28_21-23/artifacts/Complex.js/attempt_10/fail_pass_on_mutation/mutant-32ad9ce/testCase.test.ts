import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mutation || vs && in NaN check", () => {
  it("should produce correct result when computing with Infinity and zero producing partial NaN", () => {
    // Infinity * 0 in real part but not imaginary
    // mul: this=(Infinity,0), z=(0,1)
    // isInfinite check: Infinity,0 -> isInfinite = true
    // isZero check: 0,1 -> isZero = false
    // So returns Complex.INFINITY not NaN
    
    // Let's try: new Complex(Infinity, 0).mul(new Complex(0, 0))
    // this.isInfinite()=true, z.isZero()=true -> returns NaN
    const r1 = new Complex(Infinity, 0).mul(new Complex(0, 0));
    expect(r1.isNaN()).toBe(true);
    
    // Now: what creates a complex where re=NaN but im=finite?
    // 0 * Infinity = NaN in JS
    // new Complex(0 * Infinity, 1) -> re=NaN, im=1
    // Original ||: NaN||false = true -> if body (no-op)
    // Mutated &&: NaN&&false = false -> skip if
    // Both return z with re=NaN, im=1
    const r2 = new Complex(0 * Infinity, 1);
    expect(isNaN(r2.re)).toBe(true);
    expect(r2.im).toBe(1);
    // This should be considered NaN
    expect(r2.isNaN()).toBe(true);
  });
});