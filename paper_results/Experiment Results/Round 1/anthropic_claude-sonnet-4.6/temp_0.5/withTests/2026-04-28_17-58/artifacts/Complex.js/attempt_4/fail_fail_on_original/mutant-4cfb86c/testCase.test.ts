import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should return non-NaN result for purely imaginary tiny number where magnitude underflows", () => {
    const tiny = Number.MIN_VALUE;
    // a=0, b=tiny: b!==0 skips early return; d=0+tiny^2=0 (underflow) hits fallback
    // Original: re=(0!==0)?0/0:0 = 0, im=-(tiny)/0=-Infinity => atan(0 - i*Inf)
    // Mutated:  re=(0===0)?0/0:0 = NaN, im=-Infinity => atan(NaN - i*Inf) = NaN
    const result = new Complex(0, tiny).acot();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});