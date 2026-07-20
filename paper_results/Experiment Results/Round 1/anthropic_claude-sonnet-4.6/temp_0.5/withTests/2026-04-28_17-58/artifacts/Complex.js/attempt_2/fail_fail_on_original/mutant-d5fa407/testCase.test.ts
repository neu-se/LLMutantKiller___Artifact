import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot mutation detection", () => {
  it("detects mutation in acot d=0 branch by checking behavior with b non-zero when d approaches 0", () => {
    // The mutation changes (b !== 0) to (false) in the d===0 branch of acot
    // We need d = a*a + b*b === 0 with b !== 0
    // This can happen if we override the complex number's re/im after construction
    // Create a complex number and manually set values to trigger the branch
    const c = new Complex(0, 0);
    // Manually set to trigger d=0 branch but b!=0
    (c as any).re = 0;
    (c as any).im = 1e-200; // so small that a*a + b*b underflows to 0
    // 1e-200 * 1e-200 = 1e-400 which underflows to 0 in IEEE 754
    const d = (c as any).re * (c as any).re + (c as any).im * (c as any).im;
    // Verify d is actually 0 due to underflow
    if (d === 0) {
      const result = c.acot();
      // Original: (b !== 0) ? -b/0 : 0 => b=1e-200 != 0, so -1e-200/0 = -Infinity
      // new Complex(0, -Infinity).atan() 
      // Mutated: (false) ? -b/0 : 0 => 0
      // new Complex(0, 0).atan() = 0
      const originalAtan = new Complex(0, -Infinity).atan();
      expect(result.re).toBeCloseTo(originalAtan.re, 10);
      expect(result.im).toBeCloseTo(originalAtan.im, 10);
    } else {
      // If no underflow, skip - but let's ensure underflow happens
      expect(d).toBe(0);
    }
  });
});