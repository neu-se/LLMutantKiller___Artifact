import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the real part of sech for a complex number with non-zero imaginary part", () => {
    // sech(z) for z = 1 + 1i
    // In the code: a = re = 1, b = im = 1
    // d = Math.cos(2 * b) - cosh(2 * a) = cos(2) - cosh(2)
    // original re = 2 * cosh(a) * cos(b) / d
    // mutant re   = 2 * cosh(a) / cos(b) / d  (different when cos(b) != 1)

    const a = 1;
    const b = 1;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);

    // Original formula
    const expectedRe = 2 * Math.cosh(a) * Math.cos(b) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;

    const z = new Complex(a, b);
    const result = z.sech();

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});