import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("detects mutation in acosh else branch for input with positive imaginary part", () => {
    // Try z = 0 + 2i to get acos result with im > 0
    const z = new Complex(0, 2);
    const acosResult = z.acos();
    
    // Check which branch acosh takes
    const result = z.acosh();
    
    if (acosResult.im > 0) {
      // else branch: original re = old_im_acos, mutated re = old_re_acos
      // These differ when old_re_acos != old_im_acos
      expect(result.re).toBeCloseTo(acosResult.im, 8);
      expect(result.im).toBeCloseTo(-acosResult.re, 8);
    } else {
      // if branch: re = -old_im_acos, im = old_re_acos
      expect(result.re).toBeCloseTo(-acosResult.im, 8);
      expect(result.im).toBeCloseTo(acosResult.re, 8);
    }
    
    // The key assertion: re should equal acosResult.im (if else branch)
    // or -acosResult.im (if if branch)
    // Either way, re should NOT equal acosResult.re (unless re==im of acos)
    expect(result.re).not.toBeCloseTo(acosResult.re, 5);
  });
});