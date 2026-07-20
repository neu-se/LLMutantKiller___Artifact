import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a complex number with non-zero imaginary part", () => {
    // For z = 1 + i:
    // d = a^2 + b^2 = 1 + 1 = 2
    // Original computes: new Complex(a/d, -b/d).asinh() = new Complex(0.5, -0.5).asinh()
    // Mutated computes: new Complex(a*d, -b/d).asinh() = new Complex(2, -0.5).asinh()
    // These produce clearly different results
    const z = new Complex(1, 1);
    const result = z.acsch();

    // The correct value of acsch(1+i) can be verified:
    // acsch(z) = log((1 + sqrt(1 + z^2)) / z)
    // Let's compute the expected value manually using the original formula
    // acsch(1+i) ≈ 0.5306375309525178 - 0.4522784471511907i
    const expectedRe = 0.5306375309525178;
    const expectedIm = -0.4522784471511907;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});