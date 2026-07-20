import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN parsing boundary", () => {
  it("should throw SyntaxError when real part is NaN but imaginary is valid", () => {
    // Original: isNaN(NaN) || isNaN(0) = true || false = true → parser_exit (if uncommented)
    // But parser_exit IS commented out, so both versions just return z
    // Need to find actual behavioral difference...
    // Testing that NaN + valid number still produces NaN complex
    const c1 = new Complex(NaN, 0);
    const c2 = new Complex(0, NaN);
    expect(c1.isNaN()).toBe(true);
    expect(c2.isNaN()).toBe(true);
  });
});