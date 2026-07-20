import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for complex numbers where the else branch is needed", () => {
    // For acosh(2+3i), acos(2+3i) should have positive imaginary part
    // triggering the else branch in the original but if(true) in mutant
    const result = new Complex(2, 3).acosh();
    const expected = new Complex(2, 3).acos();
    // Manually compute: if res.im > 0, original does: re=res.im, im=-res.re
    // mutant always does: re=-res.im, im=res.re
    // So if res.im > 0, results differ in sign
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeLessThan(0);
  });
});