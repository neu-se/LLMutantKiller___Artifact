import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh of a complex number with non-zero imaginary part", () => {
    // atanh(0.5 + 0.5i) should give a specific result
    // The mutation changes division by d to multiplication by d in the intermediate calculation
    // which will produce an incorrect result when d != 1
    const z = new Complex(0.5, 0.5);
    const result = z.atanh();

    // Known correct value: atanh(0.5 + 0.5i) ≈ 0.4023594781085251 + 0.5535743588970452i
    // Computed via: log((1+z)/(1-z)) / 2
    const expectedRe = 0.4023594781085251;
    const expectedIm = 0.5535743588970452;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});