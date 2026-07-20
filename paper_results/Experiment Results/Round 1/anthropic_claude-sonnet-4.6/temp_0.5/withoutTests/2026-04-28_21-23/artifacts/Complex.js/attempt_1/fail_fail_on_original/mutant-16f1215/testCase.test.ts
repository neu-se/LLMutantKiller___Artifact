import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should correctly compute acsc(0 + 0i) returning PI/2 + Infinity*i", () => {
    // When a=0, b=0: the early return should give Complex(PI/2, Infinity)
    // The mutation affects the else branch (d===0) where a=0 should give re=0
    // but mutation makes it NaN. We need to trigger d===0 with a=0.
    // Use subnormal numbers to make d underflow to 0
    const tiny = 5e-324; // Number.MIN_VALUE
    // tiny*tiny underflows to 0, so d = 0, but a != 0
    // Original: (a !== 0) ? a/0 : 0 => Infinity (since a=tiny != 0)
    // Mutated: (true) ? a/0 : 0 => Infinity (same result since a != 0)
    // When a=0, b=tiny: d = tiny*tiny = 0, a=0
    // Original: re = (0 !== 0) ? 0/0 : 0 = 0
    // Mutated: re = (true) ? 0/0 : 0 = NaN
    const result = new Complex(0, tiny).acsc();
    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBe(0);
  });
});