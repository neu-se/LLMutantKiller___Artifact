import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("acsch with subnormal inputs where d underflows to 0 and b is non-zero", () => {
    const tiny = Number.MIN_VALUE; // 5e-324, smallest positive float
    // a=tiny, b=tiny: b!==0 so early return is skipped
    // d = tiny*tiny + tiny*tiny = 0 (underflow to 0)
    // d !== 0 is false, so else branch is taken
    // Original: new Complex(0, -Infinity).asinh() → Complex(NaN, NaN)
    // Mutated:  new Complex(0, 0).asinh() → Complex(0, 0)
    const c = new Complex(tiny, tiny);
    const result = c.acsch();
    expect(isNaN(result.re)).toBe(true);
  });
});