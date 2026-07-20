import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should compute acot correctly using real part", () => {
    // acot(z) = atan(1/z)
    // If acot uses var a = this['re'] correctly vs this[""] (undefined)
    // acot(1) should return pi/4
    const c = new Complex(1, 0);
    const result = c.acot();
    // acot(1) = pi/4 ≈ 0.7854
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(Math.PI / 4, 8);
    expect(result.im).toBeCloseTo(0, 8);
  });
});