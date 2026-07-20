import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sec function", () => {
  it("should correctly compute sec(z) for a complex number with non-zero imaginary part", () => {
    // sec(z) = 1 / cos(z)
    // For z = 1 + 1i, we can verify by computing cos(z) and taking its inverse
    // The mutation changes cosh(2 * b) to cosh(2 / b), which will give wrong results
    // when b != 0 and b != 1
    
    const z = new Complex(1, 2);
    const result = z.sec();
    
    // Manually compute expected value:
    // sec(a + bi) = cos(a)*cosh(b) / d + sin(a)*sinh(b) / d * i
    // where d = 0.5 * cosh(2*b) + 0.5 * cos(2*a)
    const a = 1;
    const b = 2;
    const d = 0.5 * Math.cosh(2 * b) + 0.5 * Math.cos(2 * a);
    const expectedRe = Math.cos(a) * Math.cosh(b) / d;
    const expectedIm = Math.sin(a) * Math.sinh(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});