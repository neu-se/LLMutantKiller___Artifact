import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("asech with d=0 and a=0 returns 0 for real part, not NaN", () => {
    // The mutation changes (a !== 0) ? a / 0 : 0 to (a === 0) ? a / 0 : 0
    // When a=0 and d=0: original returns 0 for re, mutated returns NaN (0/0).
    // We need to reach the d===0 branch by bypassing the isZero() early return.
    const c = new Complex(1, 0);
    c.re = 0;
    c.im = 0;
    // Override isZero on the instance (own property takes precedence over prototype)
    Object.defineProperty(c, 'isZero', {
      value: () => false,
      writable: true,
      configurable: true
    });
    
    // Verify the override works
    expect((c as any).isZero()).toBe(false);
    
    const result = c.asech();
    // Original: (a !== 0) ? a/0 : 0 => a=0, condition false, so re = 0
    // Mutated:  (a === 0) ? a/0 : 0 => a=0, condition true, so re = 0/0 = NaN
    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBe(0);
  });
});