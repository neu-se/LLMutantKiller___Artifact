import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("expm1 with small imaginary part uses cosm1 correctly", () => {
  it("should compute expm1 accurately for a purely imaginary number with small argument", () => {
    // cosm1(x) is used in expm1: Math.expm1(a) * Math.cos(b) + cosm1(b)
    // For z = 0 + 0.1i:
    //   re = Math.expm1(0) * Math.cos(0.1) + cosm1(0.1)
    //      = 0 * cos(0.1) + (cos(0.1) - 1)
    //      = cos(0.1) - 1
    //      ≈ -0.004995834721974977
    //   im = Math.exp(0) * Math.sin(0.1) = sin(0.1) ≈ 0.09983341664682815
    const z = new Complex(0, 0.1);
    const result = z.expm1();

    const expectedRe = Math.cos(0.1) - 1; // ≈ -0.004995834721974977
    const expectedIm = Math.sin(0.1);     // ≈ 0.09983341664682815

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});