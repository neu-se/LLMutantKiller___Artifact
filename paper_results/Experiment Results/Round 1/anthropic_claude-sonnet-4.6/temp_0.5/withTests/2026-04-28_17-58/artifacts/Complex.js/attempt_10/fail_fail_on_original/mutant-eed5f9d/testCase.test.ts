import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("detects mutation in acsch fallback by using inputs where a*a + b*b underflows", () => {
    // 5e-324 * 5e-324 = 0 in IEEE 754 (underflow)
    const a = 5e-324;
    const b = -5e-324;
    // d = a*a + b*b = 0 + 0 = 0, b !== 0, a !== 0
    // Original: new Complex(Infinity, Infinity).asinh()
    // Mutant:   new Complex(0, Infinity).asinh()
    // Compute both to find which property differs:
    const fromInfinity = new Complex(Infinity, Infinity).asinh();
    const fromZero = new Complex(0, Infinity).asinh();
    // Use the im part which should be same in both cases,
    // but re differs: fromInfinity is NaN, fromZero is Infinity
    const c = new Complex(a, b);
    const result = c.acsch();
    // Original produces NaN (from Infinity+Infinity*i path)
    // Mutant produces non-NaN (from 0+Infinity*i path)  
    expect(isNaN(fromInfinity.re)).toBe(true);
    expect(isNaN(fromZero.re)).toBe(false);
    expect(isNaN(result.re)).toBe(true);
  });
});