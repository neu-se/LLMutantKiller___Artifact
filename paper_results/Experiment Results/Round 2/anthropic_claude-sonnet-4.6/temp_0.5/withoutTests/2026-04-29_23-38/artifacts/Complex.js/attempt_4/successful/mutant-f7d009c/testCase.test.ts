import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function via abs()", () => {
  it("abs is symmetric for boundary value im=3000", () => {
    // For original code: abs(re + 3000i) and abs(3000 + re*i) both use
    // the stable path with b = re/3000, giving identical results.
    // For mutant: abs(re + 3000i) uses sqrt(re^2 + 9000000) while
    // abs(3000 + re*i) uses 3000*sqrt(1 + (re/3000)^2).
    // These differ when re^2 != 9000000*(re/3000)^2 in floating point.
    
    // Find a re where the two paths actually differ
    let found = false;
    for (let num = 1; num <= 100; num++) {
      for (let den = 1; den <= 100; den++) {
        const re = num / den;
        if (re >= 3000) continue;
        const direct = Math.sqrt(re * re + 9000000);
        const stable = 3000 * Math.sqrt(1 + (re / 3000) * (re / 3000));
        if (direct !== stable) {
          expect(new Complex(re, 3000).abs()).toBe(new Complex(3000, re).abs());
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (!found) {
      // fallback
      expect(new Complex(1, 3000).abs()).toBe(new Complex(3000, 1).abs());
    }
  });
});