import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero real and imaginary parts", () => {
    // For z = 0.5 + 0.5i, atanh should produce a specific result
    // Original: d = oneMinus * oneMinus + b * b = 0.25 + 0.25 = 0.5
    // Mutated:  d = oneMinus / oneMinus + b * b = 1.0 + 0.25 = 1.25
    // These produce different results, so the test will fail on the mutant

    const z = new Complex(0.5, 0.5);
    const result = z.atanh();

    // The correct value of atanh(0.5 + 0.5i) can be verified:
    // atanh(z) = log((1+z)/(1-z)) / 2
    // (1 + 0.5 + 0.5i) = 1.5 + 0.5i
    // (1 - 0.5 - 0.5i) = 0.5 - 0.5i
    // (1.5 + 0.5i) / (0.5 - 0.5i) = (1.5 + 0.5i)(0.5 + 0.5i) / ((0.5)^2 + (0.5)^2)
    //   = (0.75 + 0.75i + 0.25i - 0.25) / 0.5
    //   = (0.5 + i) / 0.5 = 1 + 2i
    // atanh(z) = log(1 + 2i) / 2
    // |1 + 2i| = sqrt(5), arg = atan2(2, 1)
    // log(1 + 2i) = ln(sqrt(5)) + i*atan2(2,1) = 0.5*ln(5) + i*atan2(2,1)
    // atanh(z) = 0.25*ln(5) + 0.5*i*atan2(2,1)

    const expectedRe = 0.25 * Math.log(5);
    const expectedIm = 0.5 * Math.atan2(2, 1);

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});