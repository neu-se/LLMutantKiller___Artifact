import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for complex number taking the else branch with distinct re and im", () => {
    // Use z = 2 + 1i, where acos(z) should have positive imaginary part
    // triggering the else branch where re gets incorrectly set in the mutant
    const c = new Complex(2, 1);
    const result = c.acosh();
    // Verify using the identity: cosh(acosh(z)) should equal z
    const coshResult = result.cosh();
    expect(coshResult.re).toBeCloseTo(2, 8);
    expect(coshResult.im).toBeCloseTo(1, 8);
  });
});