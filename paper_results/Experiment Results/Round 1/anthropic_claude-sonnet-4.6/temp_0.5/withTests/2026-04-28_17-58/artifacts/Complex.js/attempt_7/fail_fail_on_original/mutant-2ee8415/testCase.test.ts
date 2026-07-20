import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for input where acos has positive imaginary part", () => {
    // Find input where acos(z).im > 0 to trigger else branch
    // Try z = 1 + 2i
    const c = new Complex(1, 2);
    const acos = c.acos();
    
    // If acos.im > 0, else branch runs:
    // original: res.re = tmp (= acos.im), res.im = -acos.re
    // mutant:   res.re stays as acos.re (WRONG), res.im = -acos.re
    const result = c.acosh();
    
    // In original, result.re should equal acos.im (since else branch)
    // In mutant, result.re stays as acos.re
    // These differ, so check result.re === acos.im
    expect(acos.im).toBeGreaterThan(0); // confirm else branch taken
    expect(result.re).toBeCloseTo(acos.im, 10);
  });
});