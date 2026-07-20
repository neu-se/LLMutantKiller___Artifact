import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc mutation detection", () => {
  it("acsc fallback branch: imaginary part should be -Infinity when b is non-zero and d is zero", () => {
    // Use a subnormal number so small that a*a + b*b underflows to 0
    // but a !== 0 and b !== 0, bypassing the early return
    const tiny = 5e-324; // smallest positive double (subnormal)
    const c = new Complex(0, tiny);
    const result = c.acsc();
    // In the original code: (b !== 0) ? -b/0 : 0 => -Infinity
    // In the mutated code: (b === 0) ? -b/0 : 0 => 0
    // Then asin is called on (0, -Infinity) vs (0, 0)
    expect(isFinite(result.re) || isFinite(result.im)).toBe(false);
  });
});