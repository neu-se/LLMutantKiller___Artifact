import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh(2+0i) with correct real part", () => {
    // For acosh(2), acos(2) returns re=0, im=logHypot(t1.re, t1.im+2)
    // Let's verify by checking a case where the else branch gives correct results
    // and find a case that triggers the if branch
    const c = new Complex(0, 2);
    const result = c.acosh();
    // acosh(2i) = log(2i + sqrt(-4-1)) = log(2i + sqrt(-5))
    // The real part should not be NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    // Verify against known value: acosh(2i) ≈ 1.4436354751788 + 1.5707963268i
    expect(result.re).toBeCloseTo(1.4436354751788103, 8);
    expect(result.im).toBeCloseTo(Math.PI / 2, 8);
  });
});