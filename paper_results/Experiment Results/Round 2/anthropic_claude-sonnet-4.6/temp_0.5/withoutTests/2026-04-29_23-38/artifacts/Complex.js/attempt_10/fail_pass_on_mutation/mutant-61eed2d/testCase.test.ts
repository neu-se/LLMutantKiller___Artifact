import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse string with only real part giving im of 0 not NaN", () => {
    // If original sets z['im'] = undefined (separate statement), 
    // then for a real-only string like "5", the im loop never runs,
    // so im stays undefined -> NaN check in parse would catch it
    // but the NaN check is commented out! So im would be undefined/NaN
    // In mutated: z['im'] stays 0, so im=0 for real string
    const c = new Complex("5");
    // Test what actually happens - if original gives NaN for im:
    expect(c.im).toBe(0);
    expect(isNaN(c.im)).toBe(false);
    // If this passes on original, then z['im']=undefined is NOT the case
    // meaning it IS a chained assignment and both are functionally same
    // In that case, I need to accept they're the same and find another angle
    const d = new Complex("0");
    expect(d.re).toBe(0);
    expect(d.im).toBe(0);
    expect(d.isZero()).toBe(true);
  });
});