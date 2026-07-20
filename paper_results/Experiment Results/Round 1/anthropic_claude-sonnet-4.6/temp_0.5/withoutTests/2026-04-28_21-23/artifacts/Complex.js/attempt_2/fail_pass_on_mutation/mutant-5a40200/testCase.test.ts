import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosh function behavior", () => {
  it("should correctly compute cos of a complex number with non-zero imaginary part", () => {
    // cos(z) = cos(a)*cosh(b) - i*sin(a)*sinh(b)
    // For z = 0 + 2i: cos(0 + 2i) = cos(0)*cosh(2) - i*sin(0)*sinh(2)
    //                              = 1 * cosh(2) - i * 0
    //                              = cosh(2)
    //
    // Original cosh(2): |2| >= 1e-9, so uses (exp(2) + exp(-2)) * 0.5 ≈ 3.7621956910836446
    // Mutated cosh(2):  |2| >= 1e-9, so returns 1 - 2 = -1 (WRONG!)
    //
    // So original gives re ≈ 3.762, mutated gives re ≈ -1

    const z = new Complex(0, 2);
    const result = z.cos();

    const expectedRe = Math.cosh(2); // ≈ 3.7621956910836446

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});