import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should compute the complex inverse hyperbolic cosine correctly", () => {
    // acosh(2) should return a real number: log(2 + sqrt(3)) ≈ 1.3169578969248166
    const c = new Complex(2, 0);
    const result = c.acosh();
    expect(result).toBeDefined();
    expect(typeof result.re).toBe("number");
    expect(typeof result.im).toBe("number");
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    // acosh(2) = log(2 + sqrt(2^2 - 1)) = log(2 + sqrt(3)) ≈ 1.3169578969248166
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});