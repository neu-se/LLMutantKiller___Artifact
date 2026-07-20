import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should compute asech of a real number greater than 1 correctly", () => {
    // asech(2) = acosh(1/2) = log(1/2 + sqrt(1/4 - 1)) which involves complex numbers
    // For a real number a > 0, asech(a) = acosh(1/a)
    // Using a = 0.5: asech(0.5) = acosh(2) ≈ 1.3169578969...
    const c = new Complex(0.5, 0);
    const result = c.asech();
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});