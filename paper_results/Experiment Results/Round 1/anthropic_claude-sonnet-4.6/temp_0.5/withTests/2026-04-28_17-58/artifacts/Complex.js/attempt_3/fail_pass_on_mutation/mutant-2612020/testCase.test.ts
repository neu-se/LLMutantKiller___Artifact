import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse string with only real part correctly when re would otherwise accumulate", () => {
    // The mutation sets z['re'] to undefined behavior by assigning to z[""] instead
    // Test that parsing a string with a real number works correctly
    // In the mutated code, z['re'] = 0 reset is replaced with z[""] = 0
    // meaning z['re'] starts undefined (not 0) during token accumulation
    // z is created as { 're': 0, 'im': 0 } so re starts at 0
    // but the explicit reset in string branch is removed
    // This only matters if somehow re gets a non-zero value before the string branch
    // which can't happen with a fresh z object
    
    // Test the "" property - in original, z[""] gets set to 0 via chained assignment
    // In mutated, z[""] also gets set to 0 directly - truly equivalent
    // Let's just verify basic string parsing still works
    const c = new Complex("5");
    expect(c.re).toBe(5);
    expect(c.im).toBe(0);
  });
});