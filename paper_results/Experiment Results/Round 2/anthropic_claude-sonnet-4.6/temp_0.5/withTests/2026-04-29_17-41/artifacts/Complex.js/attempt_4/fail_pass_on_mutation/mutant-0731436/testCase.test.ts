import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe("Complex asec", () => {
  it("detects mutation using value where a*a+b*b underflows to 0 but b is non-zero", () => {
    // 1e-200 * 1e-200 = 1e-400 which underflows to 0 in double precision
    const small = 1e-200;
    expect(small * small).toBe(0);
    expect(small).not.toBe(0);
    
    const c = new Complex(small, small);
    const result = c.asec();
    // d = small^2 + small^2 = 0, so else branch taken
    // Original: im = (b !== 0) ? -b/0 : 0 = -Infinity → acos(0, -Infinity) → NaN
    // Mutated:  im = (false) ? -b/0 : 0 = 0 → acos(0, 0) → (π/2, 0)
    expect(result.isNaN()).toBe(true);
  });
});