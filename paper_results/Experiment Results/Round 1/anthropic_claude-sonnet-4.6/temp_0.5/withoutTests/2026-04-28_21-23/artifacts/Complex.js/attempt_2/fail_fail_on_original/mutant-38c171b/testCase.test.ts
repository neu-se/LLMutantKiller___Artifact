import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("computes acsch correctly when d underflows to zero but b is nonzero", () => {
    const minVal = Number.MIN_VALUE;
    // a=0, b=MIN_VALUE: d = 0 + MIN_VALUE^2 underflows to 0
    // b === 0 is false, so no early return
    // d !== 0 is false (d === 0), so goes to else branch
    // Original: (b !== 0) ? -b/0 : 0 = -MIN_VALUE/0 = -Infinity
    // Mutated: (false) ? -b/0 : 0 = 0
    // new Complex(0, -Infinity).asinh() vs new Complex(0, 0).asinh()
    const c = new Complex(0, minVal);
    const result = c.acsch();
    // Original produces complex with -Infinity imaginary in intermediate
    // asinh(-Infinity*i) should give -i*pi/2 or similar
    // The key: original != mutated
    expect(isFinite(result.im) || result.im === -Math.PI/2).toBe(true);
    // More specifically, original gives non-zero result
    const resultMagnitude = Math.abs(result.re) + Math.abs(result.im);
    expect(resultMagnitude).toBeGreaterThan(0);
  });
});