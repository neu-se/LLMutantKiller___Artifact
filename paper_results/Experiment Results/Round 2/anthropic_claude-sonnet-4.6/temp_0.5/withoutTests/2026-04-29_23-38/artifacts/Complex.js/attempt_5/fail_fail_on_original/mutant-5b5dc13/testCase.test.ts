import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("computes acsch correctly when a=0 and b is tiny causing d to underflow", () => {
    // a=0, b=tiny: d = 0+tiny*tiny underflows to 0, b!==0 so early return skipped
    // Original: (a !== 0) ? a/0 : 0  => (0 !== 0) ? ... : 0  => 0
    //   => new Complex(0, -Infinity).asinh()
    // Mutated:  (a === 0) ? a/0 : 0  => (0 === 0) ? 0/0 : 0  => NaN
    //   => new Complex(NaN, -Infinity).asinh() => isNaN
    const tiny = 5e-324;
    const c = new Complex(0, tiny);
    const result = c.acsch();
    expect(result.isNaN()).toBe(false);
  });
});