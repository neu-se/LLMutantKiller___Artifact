import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("detects mutation in acsch when a=0 and b is subnormal causing d to underflow to 0", () => {
    const tiny = 5e-324;
    // With a=0, b=tiny: d = 0 + tiny*tiny = 0 (underflow)
    // b !== 0, so early return skipped
    // d === 0 branch hit with a = 0
    // Original: (a !== 0) ? a/0 : 0 = 0  (since a === 0)
    // Mutated:  (a === 0) ? a/0 : 0 = 0/0 = NaN (since a === 0)
    // second arg: (b !== 0) ? -b/0 : 0 = -Infinity
    // Original: Complex(0, -Infinity).asinh()
    // Mutated:  Complex(NaN, -Infinity).asinh() → NaN
    const result = new Complex(0, tiny).acsch();
    expect(isNaN(result.re)).toBe(false);
  });
});