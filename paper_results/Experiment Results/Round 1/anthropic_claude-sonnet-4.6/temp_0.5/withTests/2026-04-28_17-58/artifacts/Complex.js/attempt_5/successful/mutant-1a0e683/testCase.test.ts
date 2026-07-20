import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should handle 0^(positive real) correctly without NaN", () => {
    // If placeholder is inside z.im===0 block after the a===0 switch,
    // then for base=0+0i with real positive exponent, after switch returns,
    // the placeholder is never reached.
    // But if a=0, b=0 and z.im===0 but z.re is NOT handled by switch (impossible since switch covers all mod 4 cases)
    // Try: what if base is 0+0i and exponent is positive integer - does switch handle non-integer z.re?
    // switch((z['re'] % 4 + 4) % 4) - for z.re=1.5, this gives 1.5, no case matches, falls through to placeholder!
    const result = new Complex(0, 0).pow(new Complex(1.5, 0));
    // Original: placeholder fires (a=0,b=0,z.re=1.5>0,z.im=0>=0) → returns ZERO
    // Mutated: placeholder doesn't fire (z.im=0 not > 0) → falls through to NaN computation
    expect(result.isNaN()).toBe(false);
  });
});