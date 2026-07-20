import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("cosh(acosh(z)) should equal z for a complex number triggering the else branch", () => {
    // Use a value where acos returns positive imaginary part (else branch in acosh)
    // Verify round-trip: cosh(acosh(z)) = z
    const z = new Complex(1, 3);
    const acosh_z = z.acosh();
    const result = acosh_z.cosh();
    
    expect(result.re).toBeCloseTo(z.re, 8);
    expect(result.im).toBeCloseTo(z.im, 8);
  });
});