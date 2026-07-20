import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should return NaN when both components are subnormal causing d to underflow to zero with nonzero real part", () => {
    const tiny = Number.MIN_VALUE;
    // Verify IEEE 754 underflow occurs
    expect(tiny * tiny).toBe(0);
    // With a=tiny, b=tiny: d=0, a!=0, b!=0
    // Original: re=tiny/0=Infinity, im=-tiny/0=-Infinity -> atan(Inf,-Inf) -> NaN
    // Mutated:  re=tiny*0=0,        im=-tiny/0=-Infinity -> atan(0,-Inf)   -> NaN
    const result = new Complex(tiny, tiny).acot();
    expect(result.isNaN()).toBe(true);
  });
});