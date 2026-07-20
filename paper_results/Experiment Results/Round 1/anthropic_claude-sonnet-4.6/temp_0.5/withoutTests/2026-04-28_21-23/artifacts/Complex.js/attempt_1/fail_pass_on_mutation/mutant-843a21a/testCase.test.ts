import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should compute asech correctly for a complex number with zero real part and nonzero imaginary part", () => {
    // When a=0, b!=0: d = 0*0 + b*b = b*b != 0, so goes to first branch
    // The mutation is in d===0 branch where a!==0
    // To reach d===0 branch with a!==0, we need a*a + b*b = 0 with a!=0
    // This is impossible with real numbers, but let's test the d!==0 path
    // with a=0, b=1: asech(i) = acosh(1/i) = acosh(-i)
    const c = new Complex(0, 1);
    const result = c.asech();
    // asech(i) = log((1 + sqrt(1 - i^2)) / i) = log((1 + sqrt(2)) / i)
    // Expected: re ≈ 0, im ≈ -π/4 ... let's compute via the formula
    // asech(z) = acosh(1/z), 1/i = -i
    // acosh(-i): use the formula
    const expected = new Complex(0, 1).inverse().acosh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});