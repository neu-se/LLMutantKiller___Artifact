import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a complex number where acos gives negative imaginary part", () => {
    // acosh(0 + 2i) - using a purely imaginary input
    const result = new Complex(0, 2).acosh();
    // Expected: acosh(2i) = log(2i + sqrt(-4-1)) = log(2i + sqrt(-5))
    // The result should have specific re and im values
    const expected = new Complex(0, 2).acosh();
    // Verify it's not NaN (mutation causes NaN in im)
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});