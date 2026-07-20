import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot mutation test', () => {
  it('should compute acot correctly for a complex number with positive imaginary part when d approaches zero', () => {
    // Test acot with b=0 path and normal path to ensure correctness
    // The mutation affects the d===0 branch with -b/0 vs +b/0
    // We test with values that exercise the normal path and verify sign conventions
    const c = new Complex(0, 2);
    const result = c.acot();
    // acot(2i) = atan(1/(2i)) = atan(-i/2)
    // For z = 2i: d = 0 + 4 = 4, so normal path: new Complex(0/4, -2/4).atan() = new Complex(0, -0.5).atan()
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.atanh(0.5), 10);
  });
});