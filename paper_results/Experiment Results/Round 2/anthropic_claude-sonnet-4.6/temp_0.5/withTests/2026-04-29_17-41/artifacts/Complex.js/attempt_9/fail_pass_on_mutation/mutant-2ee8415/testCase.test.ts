import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("acosh(3) should equal log(3 + sqrt(8)) with zero imaginary part", () => {
    // acosh(3) = log(3 + sqrt(8)) ≈ 1.7627471740390859, im = 0
    // acos(3) returns (PI/2 - t2.im, t2.re) where t2.re > 0
    // So acos(3).im > 0, triggering else branch in acosh
    // Original else: re = old_im (positive logHypot value), im = -old_re
    // Mutated else: re stays as old_re (PI/2 - something), im = -old_re
    const result = new Complex(3, 0).acosh();
    expect(result.re).toBeCloseTo(1.7627471740390859, 8);
    expect(result.im).toBeCloseTo(0, 8);
  });
});