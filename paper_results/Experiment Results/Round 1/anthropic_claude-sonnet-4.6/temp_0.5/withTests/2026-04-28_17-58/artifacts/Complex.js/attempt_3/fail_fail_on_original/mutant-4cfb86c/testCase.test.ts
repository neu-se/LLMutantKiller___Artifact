import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should produce correct result for tiny complex number where squared magnitude underflows to zero", () => {
    const tiny = Number.MIN_VALUE;
    // tiny * tiny === 0 in IEEE 754 (underflow), so d = 0, hitting fallback
    // b = -tiny !== 0, so early return is skipped
    // Original: re = (tiny !== 0) ? tiny/0 : 0 = Infinity
    //           im = (-tiny !== 0) ? -(-tiny)/0 : 0 = Infinity  
    // => new Complex(Infinity, Infinity).atan()
    // Mutated:  re = (tiny === 0) ? tiny/0 : 0 = 0
    //           im = (-tiny !== 0) ? tiny/0 : 0 = Infinity
    // => new Complex(0, Infinity).atan()
    const result = new Complex(tiny, -tiny).acot();
    const mutatedPath = new Complex(0, Infinity).atan();
    const originalPath = new Complex(Infinity, Infinity).atan();
    
    // Verify original and mutated paths differ
    // original: NaN (Infinity-Infinity), mutated: specific value
    expect(result.re).not.toEqual(mutatedPath.re);
  });
});