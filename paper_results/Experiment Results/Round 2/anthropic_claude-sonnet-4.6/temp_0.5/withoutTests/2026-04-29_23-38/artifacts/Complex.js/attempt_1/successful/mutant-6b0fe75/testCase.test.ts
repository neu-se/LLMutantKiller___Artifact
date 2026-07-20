import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosh behavior via Complex trigonometric functions', () => {
  it('should compute cos(0 + i*1e-10) correctly using native Math.cosh', () => {
    // cos(a + bi) = cos(a)*cosh(b) - i*sin(a)*sinh(b)
    // cos(0 + i*1e-10) = cos(0)*cosh(1e-10) - i*sin(0)*sinh(1e-10)
    //                  = 1 * cosh(1e-10) - 0
    //                  = cosh(1e-10)
    // Native Math.cosh(1e-10) ≈ 1.0 (very close to 1)
    // Buggy custom: 1 - 1e-10 = 0.9999999999
    const c = new Complex(0, 1e-10);
    const result = c.cos();
    // Native Math.cosh(1e-10) should be essentially 1.0
    expect(result.re).toBeCloseTo(Math.cosh(1e-10), 10);
  });
});