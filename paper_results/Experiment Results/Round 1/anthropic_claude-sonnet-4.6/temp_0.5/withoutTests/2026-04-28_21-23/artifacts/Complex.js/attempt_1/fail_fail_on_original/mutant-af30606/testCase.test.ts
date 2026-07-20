import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the imaginary part of sech for a complex number with non-trivial real and imaginary parts", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // For c = a + bi:
    // sech(c) = 2 * cosh(a) * cos(b) / d - 2i * sinh(a) * sin(b) / d
    // where d = cos(2b) + cosh(2a)
    // The mutation changes -2 * sinh(a) * sin(b) / d to -2 / sinh(a) * sin(b) / d
    // These differ when sinh(a) != 1, i.e., when a != asinh(1) ≈ 0.8814

    // Use a = 1, b = 1 as test input
    // sinh(1) ≈ 1.1752, so -2 * sinh(1) * sin(1) / d != -2 / sinh(1) * sin(1) / d
    const c = new Complex(1, 1);
    const result = c.sech();

    // Compute expected values manually
    const a = 1;
    const b = 1;
    const coshA = Math.cosh(a);
    const sinhA = Math.sinh(a);
    const cosB = Math.cos(b);
    const sinB = Math.sin(b);
    const d = Math.cos(2 * b) + Math.cosh(2 * a);

    const expectedRe = 2 * cosB / coshA / d;
    const expectedIm = -2 * sinhA * sinB / d;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});