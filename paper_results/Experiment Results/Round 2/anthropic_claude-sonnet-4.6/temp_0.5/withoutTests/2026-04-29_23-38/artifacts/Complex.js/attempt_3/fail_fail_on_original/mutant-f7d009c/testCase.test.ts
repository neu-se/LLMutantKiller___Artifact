import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function via abs()", () => {
  it("abs() uses stable computation path when imaginary part is exactly 3000", () => {
    // Use re=0.1 (not exactly representable in binary floating point)
    // When im=3000: a=0.1, b=3000
    // Original: b not < 3000, uses stable path: 3000 * sqrt(1 + (0.1/3000)^2)
    // Mutant: b <= 3000, uses direct path: sqrt(0.1^2 + 3000^2)
    //
    // Key: 0.1 is not exactly representable, so (0.1/3000)^2 and 0.1*0.1
    // accumulate rounding errors differently, potentially giving different results.
    const re = 0.1;
    const im = 3000;

    // Compute what each path gives
    const stablePath = 3000 * Math.sqrt(1 + (re / im) * (re / im));
    const directPath = Math.sqrt(re * re + im * im);

    // Verify the two paths actually differ (if they don't, this test can't detect the mutation)
    // and assert the original code produces the stable path result
    if (stablePath !== directPath) {
      const c = new Complex(re, im);
      expect(c.abs()).toBe(stablePath);
    } else {
      // Try a different value where paths definitely differ
      const re2 = 1 / 7; // 1/7 is not exactly representable
      const stablePath2 = 3000 * Math.sqrt(1 + (re2 / im) * (re2 / im));
      const directPath2 = Math.sqrt(re2 * re2 + im * im);
      const c2 = new Complex(re2, im);
      expect(c2.abs()).toBe(stablePath2);
      expect(stablePath2).not.toBe(directPath2);
    }
  });
});