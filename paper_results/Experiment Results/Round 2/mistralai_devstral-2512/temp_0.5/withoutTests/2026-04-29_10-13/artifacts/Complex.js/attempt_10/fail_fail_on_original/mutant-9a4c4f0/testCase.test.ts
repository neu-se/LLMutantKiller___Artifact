import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute expm1 for small complex numbers", () => {
    const x = 0.001;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The mutation changes the Taylor series calculation from multiplication to division
    // This should produce different results for small x values
    // Let's compute what the original should produce
    const xx = x * x;
    const originalCosm1 = xx * (xx * (xx * (xx * (xx * (xx / 20922789888000 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) - 1 / 2;
    const expectedRe = Math.expm1(x) + originalCosm1;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});