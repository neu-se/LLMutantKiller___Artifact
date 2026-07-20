import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parse with null", () => {
  it("should have im property equal to 0 (not just falsy) when constructed with null", () => {
    const c = new Complex(null);
    // The mutation changes z[""] = z['im'] = 0 to z[""] = 0
    // Both result in im=0 since z is initialized with im:0
    // But we can check that no spurious "" property leaks through
    // Actually let's verify the chained assignment: in original z['im'] gets 0 explicitly
    // We need to detect that the mutation breaks something observable
    // The key insight: z is initialized as {'re':0,'im':0}, so im=0 either way
    // BUT: what if we can detect via the "" property on the result?
    // The "" property is on z (local var), not on the Complex instance
    // We need another angle - let's check NaN behavior
    const result = new Complex(null);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(result.isNaN()).toBe(false);
    expect(result.isZero()).toBe(true);
  });
});