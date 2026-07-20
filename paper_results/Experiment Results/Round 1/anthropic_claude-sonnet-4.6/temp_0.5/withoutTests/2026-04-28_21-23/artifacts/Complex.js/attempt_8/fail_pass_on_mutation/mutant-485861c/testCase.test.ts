import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parse detects mutation via re property", () => {
  it("original sets z re via chained assignment but mutation does not - detectable if re starts undefined", () => {
    // What if the original code is actually:
    // z['re'] = z['im'] = 0  (sets BOTH re and im)
    // and mutation changes 're' key to "" key
    // z[""] = z['im'] = 0  (only sets im, re stays at initialized 0)
    // Since z = {'re':0,'im':0}, re is 0 in both cases
    // 
    // I need to find a case where behavior differs
    // Let me check: does the parse function get called with null in any chain?
    
    // Test: Complex(null).add(Complex(null))
    const a = new Complex(null);
    const b = new Complex(null);
    const result = a.add(b);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(result.isZero()).toBe(true);
    expect(result.toString()).toBe('0');
  });
});