import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("acsch with complex input", () => {
  it("should correctly compute acsch for a complex number with non-zero imaginary part", () => {
    // For acsch(1 + i), the original code uses the general path via asinh
    // The mutated code (if (true)) always uses the real-only formula
    // which gives a wrong result for complex inputs
    const result = new Complex(1, 1).acsch();

    // The correct result via the general path:
    // d = 1^2 + 1^2 = 2
    // new Complex(1/2, -1/2).asinh()
    // which is NOT purely real
    // The mutated code would return new Complex(log(1 + sqrt(2)), 0) which has im === 0

    // Verify the imaginary part is not zero (the real-only formula gives im === 0)
    expect(result.im).not.toBeCloseTo(0, 10);

    // Also verify the real part differs from the incorrect real-only formula
    const incorrectRe = Math.log(1 + Math.sqrt(1 * 1 + 1));
    expect(result.re).not.toBeCloseTo(incorrectRe, 10);
  });
});