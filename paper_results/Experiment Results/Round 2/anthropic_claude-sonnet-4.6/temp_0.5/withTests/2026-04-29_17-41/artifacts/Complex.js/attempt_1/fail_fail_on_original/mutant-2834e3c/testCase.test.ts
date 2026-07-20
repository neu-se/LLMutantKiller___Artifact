import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech mutation detection", () => {
  it("should compute asech correctly for a purely imaginary number where b !== 0", () => {
    // For a purely imaginary number like 0 + 1i
    // asech(i) = acosh(1/i) = acosh(-i)
    // The mutation changes (b !== 0) ? -b / 0 : 0 to (false) ? -b / 0 : 0
    // This affects the fallback branch when d = a^2 + b^2 = 0 but b != 0
    // Since d=0 requires a=b=0, and isZero() returns early, we test normal behavior
    // to ensure the function is not broken by the mutation in unexpected ways.
    // Test with a value that exercises the d !== 0 branch normally.
    const z = new Complex(0, 1);
    const result = z.asech();
    
    // asech(i) = acosh(1/i) = acosh(-i)
    // Expected: re ≈ 0, im ≈ -π/2 ... let's verify with known formula
    // asech(z) = acosh(1/z), 1/i = -i
    // acosh(-i): use the formula acosh(z) = log(z + sqrt(z^2 - 1))
    // z = -i, z^2 = -1, z^2 - 1 = -2, sqrt(-2) = i*sqrt(2)
    // -i + i*sqrt(2) = i*(sqrt(2) - 1)
    // log(i*(sqrt(2)-1)) = log(sqrt(2)-1) + i*pi/2
    // So re = log(sqrt(2)-1) ≈ -0.8814, im = pi/2 ≈ 1.5708
    const expectedRe = Math.log(Math.sqrt(2) - 1);
    const expectedIm = Math.PI / 2;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});