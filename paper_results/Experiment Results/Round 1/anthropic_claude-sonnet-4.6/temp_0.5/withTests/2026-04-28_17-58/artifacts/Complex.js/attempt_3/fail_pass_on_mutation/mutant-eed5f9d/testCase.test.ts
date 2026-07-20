import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch with subnormal values triggering d=0 fallback should produce NaN (not a finite/infinite result)", () => {
    const tiny = Number.MIN_VALUE;
    const c = new Complex(tiny, tiny);
    // d = tiny*tiny + tiny*tiny = 0, triggering fallback
    // Original: Complex(Infinity, -Infinity).asinh() -> NaN
    // Mutant:   Complex(0, -Infinity).asinh() -> not NaN
    const result = c.acsch();
    expect(result.isNaN()).toBe(true);
  });
});