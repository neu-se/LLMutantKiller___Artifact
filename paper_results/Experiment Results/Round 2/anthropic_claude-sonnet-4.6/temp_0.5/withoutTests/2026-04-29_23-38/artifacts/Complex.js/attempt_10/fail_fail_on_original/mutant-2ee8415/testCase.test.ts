import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("acosh result re should differ from acos result re when else branch is taken", () => {
    // Find input where acos gives positive im
    // acos(a+bi) = (PI/2 - t2.im, t2.re), so im>0 when t2.re > 0
    // Try z = 2+1i
    const z = new Complex(2, 1);
    const acos_z = z.acos();
    
    // Only proceed if else branch would be taken
    if (acos_z.im > 0) {
      const acosh_z = z.acosh();
      // Original: acosh_z.re = acos_z.im (they differ since acos_z.re != acos_z.im)
      // Mutated: acosh_z.re = acos_z.re (unchanged)
      expect(acosh_z.re).toBeCloseTo(acos_z.im, 8);
      expect(acosh_z.re).not.toBeCloseTo(acos_z.re, 5);
    } else {
      fail('else branch not taken - need different input');
    }
  });
});