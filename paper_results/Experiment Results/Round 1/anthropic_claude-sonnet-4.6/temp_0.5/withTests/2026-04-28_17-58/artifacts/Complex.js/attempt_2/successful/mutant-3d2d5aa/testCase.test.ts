import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("computes acoth correctly when d underflows to zero with nonzero imaginary part", () => {
    // Use subnormal numbers so that a*a + b*b underflows to 0
    // but a and b themselves are nonzero, reaching the d===0 branch
    // Original: im part = (b !== 0) ? -b/0 : 0 = -Infinity
    // Mutated:  im part = (false) ? -b/0 : 0 = 0
    const tiny = 5e-324; // smallest positive double (subnormal)
    const z = new Complex(0, tiny);
    const result = z.acoth();
    // d = 0*0 + tiny*tiny = 0 (underflow), b = tiny != 0
    // original: new Complex(0, -Infinity).atanh()
    // mutated:  new Complex(0, 0).atanh() = 0
    // atanh(0 - i*Infinity) should have nonzero imaginary part
    const mutatedResult = new Complex(0, 0).atanh();
    expect(result.re).not.toBeCloseTo(mutatedResult.re, 5);
  });
});