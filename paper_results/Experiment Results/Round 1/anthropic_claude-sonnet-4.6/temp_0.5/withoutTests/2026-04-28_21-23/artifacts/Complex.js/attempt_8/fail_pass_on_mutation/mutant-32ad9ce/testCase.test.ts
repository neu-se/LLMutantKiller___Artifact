import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN single component", () => {
  it("should handle parsing when only real part is NaN without crashing", () => {
    // If return z is inside the if block:
    // Original ||: single NaN -> condition true -> return z (works)
    // Mutated &&: single NaN -> condition false -> no return -> undefined -> crash
    // Test: create complex via two-arg where first arg is NaN, second is a number
    let c: any;
    let error: any;
    try {
      c = new Complex(NaN, 1);
    } catch(e) {
      error = e;
    }
    // On original: should succeed and c.re should be NaN
    expect(error).toBeUndefined();
    expect(c).toBeDefined();
    expect(isNaN(c.re)).toBe(true);
    expect(c.im).toBe(1);
  });
});