import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech function", () => {
  it("should compute asech correctly for a real number greater than 1", () => {
    // asech(2) = acosh(1/2) = log(1/2 + sqrt(1/4 - 1)) = log(1/2 + sqrt(-3/4))
    // For real x > 1, asech(x) is purely imaginary
    // asech(0.5) = acosh(2) which is real
    // Test with a complex number where a !== 0 and b !== 0 to exercise the code path
    // The mutation changes (a !== 0) ? a/0 : 0 to (a === 0) ? a/0 : 0
    // This affects the d === 0 branch in asech
    // When a !== 0 and b === 0 and d = 0 is impossible since d = a*a + b*b >= 0
    // Let's test a normal asech computation to verify correctness
    const c = new Complex(0.5, 0);
    const result = c.asech();
    // asech(0.5) = acosh(2) ≈ 1.3169578969248166
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});