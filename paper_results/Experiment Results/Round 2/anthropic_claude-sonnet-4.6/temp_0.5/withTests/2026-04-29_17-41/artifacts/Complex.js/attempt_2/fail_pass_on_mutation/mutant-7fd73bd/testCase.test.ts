import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log mutation detection", () => {
  it("should compute log correctly for a complex number with positive real and non-zero imaginary parts", () => {
    // For z = 1 + i, log(z) = log(sqrt(2)) + i*pi/4
    const result = new Complex(1, 1).log();
    expect(result.re).toBeCloseTo(Math.log(Math.sqrt(2)), 10);
    expect(result.im).toBeCloseTo(Math.PI / 4, 10);
  });
});