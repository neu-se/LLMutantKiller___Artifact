import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("computes acsch correctly when a is non-zero and d underflows to zero", () => {
    // Use extremely small values where a*a + b*b underflows to 0
    // but b !== 0 so the b===0 early return is skipped
    const tiny = 5e-324; // smallest positive float (Number.MIN_VALUE)
    const c = new Complex(tiny, tiny);
    const result = c.acsch();
    // Original: a !== 0 => a/0 = Infinity, so re = Infinity
    // Mutated: a === 0 is false => returns 0, so re = 0
    expect(result.re).toBe(Infinity);
  });
});