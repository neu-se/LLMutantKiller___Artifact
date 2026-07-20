import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth for a non-zero complex number with non-zero magnitude", () => {
    // For a complex number with d = a^2 + b^2 != 0, acoth should return a valid result
    // In the mutated code, (d !== 0) is replaced with (false), so it always takes the else branch
    // which uses division by zero, producing Infinity values instead of the correct result
    const c = new Complex(2, 1);
    const result = c.acoth();
    
    // acoth(2+i) should produce a finite complex number
    // The original code: returns new Complex(a/d, -b/d).atanh() when d !== 0
    // The mutated code: always returns new Complex(a/0, -b/0).atanh() = new Complex(Infinity, -Infinity).atanh()
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});