import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("detects mutation in acosh else branch by checking re of result directly against acos intermediate", () => {
    // Test multiple candidates to find one where acos(z).im > 0
    const candidates = [
      new Complex(-2, -0.1),
      new Complex(0, -0.5),
      new Complex(-1, -1),
      new Complex(1, -2),
      new Complex(3, -2),
    ];
    
    let found = false;
    for (const c of candidates) {
      const acos = c.acos();
      if (acos.im > 0) {
        found = true;
        const result = c.acosh();
        // Original: result.re = acos.im (tmp)
        // Mutant: result.re = acos.re (unchanged)
        // They differ when acos.re !== acos.im
        expect(result.re).toBeCloseTo(acos.im, 8);
        expect(result.re).not.toBeCloseTo(acos.re, 3);
        break;
      }
    }
    expect(found).toBe(true);
  });
});