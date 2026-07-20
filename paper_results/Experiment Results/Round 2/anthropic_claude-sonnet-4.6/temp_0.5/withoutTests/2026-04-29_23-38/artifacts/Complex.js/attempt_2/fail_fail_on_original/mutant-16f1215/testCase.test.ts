import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc with subnormal real part where d underflows to zero should return finite real part", () => {
    // Use Number.MIN_VALUE so that a*a + b*b underflows to 0
    // but a !== 0, so the early return is skipped
    // Original: (a !== 0) ? a/0 : 0 => Infinity (since a !== 0)
    // Mutated: (true) ? a/0 : 0 => Infinity (same here since a !== 0)
    // Need a === 0 case in else branch...
    // Try a=0, b=Number.MIN_VALUE: d = b*b = 0, a === 0
    // Original: (a !== 0) ? a/0 : 0 => 0 (since a === 0)
    // Mutated: (true) ? a/0 : 0 => 0/0 = NaN
    const result = new Complex(0, Number.MIN_VALUE).acsc();
    expect(isNaN(result.re)).toBe(false);
  });
});