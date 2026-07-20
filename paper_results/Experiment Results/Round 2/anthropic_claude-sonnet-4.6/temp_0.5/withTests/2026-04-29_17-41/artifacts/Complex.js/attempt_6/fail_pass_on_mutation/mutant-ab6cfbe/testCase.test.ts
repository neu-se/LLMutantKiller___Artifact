import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("pow with zero base and real exponent should use imaginary base path", () => {
    // pow(0, 0.5): a=0, b=0, z.im=0
    // Original (a > 0): false, goes to a===0 branch, (0.5%4+4)%4 = 0.5, no case matches -> falls through
    // Actually switch on non-integer won't match cases 0,1,2,3
    // Mutated (a >= 0): true, returns Complex(Math.pow(0, 0.5), 0) = Complex(0, 0)
    const result = new Complex(0, 0).pow(0.5);
    expect(isNaN(result.re)).toBe(false);
  });
});