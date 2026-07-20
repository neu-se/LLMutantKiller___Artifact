import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should correctly compute asech of a real number", () => {
    // asech(0.5) = acosh(1/0.5) = acosh(2)
    // For a real number a, asech(a) = log(1/a + sqrt(1/a^2 - 1))
    // asech(0.5) ≈ 1.3169578969248166
    const c = new Complex(0.5, 0);
    const result = c.asech();
    
    // The result should be a real number approximately 1.3169578969248166
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});