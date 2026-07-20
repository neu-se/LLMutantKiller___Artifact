import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse imaginary-only string 'i' returning re=0, im=1", () => {
    // Force a case where im initialization matters by checking NaN behavior
    // If z['im'] were undefined (not 0), then z['im'] += 1 would give NaN
    // Original sets z['im'] = 0 via chain; mutated leaves z['im'] at initial 0
    // Both should give 0, so let's verify no NaN occurs
    const c = new Complex("i");
    expect(isNaN(c.im)).toBe(false);
    expect(c.im).toBe(1);
    expect(c.re).toBe(0);
    
    // Also test that re was properly reset (both mutations do this)
    const c2 = new Complex("-i");
    expect(c2.im).toBe(-1);
    expect(c2.re).toBe(0);
    
    // Test with explicit zero
    const c3 = new Complex("0i");
    expect(c3.im).toBe(0);
    expect(c3.re).toBe(0);
  });
});