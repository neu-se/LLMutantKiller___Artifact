import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the imaginary part of sech(1+i)", () => {
    // sech(c) imaginary part = -2 * sinh(a) * sin(b) / d
    // where d = cos(2b) + cosh(2a)
    // Mutation changes this to: -2 / sinh(a) * sin(b) / d
    // These differ when sinh(a) != 1

    const a = 1;
    const b = 1;
    const c = new Complex(a, b);
    const result = c.sech();

    // Compute expected imaginary part using the correct formula
    const sinhA = Math.sinh(a);
    const sinB = Math.sin(b);
    const d = Math.cos(2 * b) + Math.cosh(2 * a);

    // Original: -2 * sinh(a) * sin(b) / d
    const expectedIm = -2 * sinhA * sinB / d;

    // Mutated would be: -2 / sinh(a) * sin(b) / d
    const mutatedIm = -2 / sinhA * sinB / d;

    // Sanity check: the two values must differ for this test to be meaningful
    // sinh(1) ≈ 1.1752, so they differ
    expect(Math.abs(expectedIm - mutatedIm)).toBeGreaterThan(1e-6);

    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});