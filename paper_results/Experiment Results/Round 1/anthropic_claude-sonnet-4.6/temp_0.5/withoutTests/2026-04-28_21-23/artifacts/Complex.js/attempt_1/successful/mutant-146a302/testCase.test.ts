import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sec function", () => {
  it("should correctly calculate sec(z) for a complex number with non-trivial real and imaginary parts", () => {
    // sec(z) = 1 / cos(z)
    // For z = 1 + i, we can verify sec(z) = 1/cos(z)
    // The denominator d = 0.5 * cosh(2*b) + 0.5 * cos(2*a)
    // With mutation: d = 0.5 * cosh(2*b) + 0.5 * cos(2/a)
    // For a=1, b=1: cos(2*1) = cos(2) vs cos(2/1) = cos(2) -- same!
    // Need a != 1, so use a=2, b=1:
    // Original: d = 0.5 * cosh(2) + 0.5 * cos(4)
    // Mutated:  d = 0.5 * cosh(2) + 0.5 * cos(2/2) = 0.5 * cosh(2) + 0.5 * cos(1)
    
    const z = new Complex(2, 1);
    const result = z.sec();
    
    // Verify against the known formula: sec(z) = 1/cos(z)
    // cos(2+i) = cos(2)*cosh(1) - i*sin(2)*sinh(1)
    const cosZ = z.cos();
    const expected = new Complex(1, 0).div(cosZ);
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});