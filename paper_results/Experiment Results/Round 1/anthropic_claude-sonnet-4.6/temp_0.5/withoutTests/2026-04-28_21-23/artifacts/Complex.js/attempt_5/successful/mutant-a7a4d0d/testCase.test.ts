import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should compute acosh(0-3i) correctly where acos gives positive imaginary part", () => {
    // acosh(-3i): acos(-3i) should have positive imaginary part
    // triggering else branch in original but if branch in mutant
    const result = new Complex(0, -3).acosh();
    // The real part should equal the imaginary part of acos(-3i)
    // The imaginary part should equal -real part of acos(-3i)
    // Verify re > 0 and im < 0 for original
    const acosResult = new Complex(0, -3).acos();
    // If acosResult.im > 0, original takes else: re=acosResult.im, im=-acosResult.re
    // mutant takes if: re=-acosResult.im, im=acosResult.re
    if (acosResult.im > 0) {
      expect(result.re).toBeCloseTo(acosResult.im, 10);
      expect(result.im).toBeCloseTo(-acosResult.re, 10);
    } else {
      expect(result.re).toBeCloseTo(-acosResult.im, 10);
      expect(result.im).toBeCloseTo(acosResult.re, 10);
    }
  });
});