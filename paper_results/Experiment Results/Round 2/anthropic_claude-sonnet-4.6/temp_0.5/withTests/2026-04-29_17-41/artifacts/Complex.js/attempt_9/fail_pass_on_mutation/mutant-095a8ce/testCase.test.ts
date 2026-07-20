import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc of zero has non-zero real part equal to PI/2", () => {
    const zero = new Complex(0, 0);
    const result = zero.acsc();
    // Original code: returns new Complex(Math.PI / 2, Infinity)
    // Mutated code: if(false) skips special case, d=0, returns new Complex(0,0).asin() = new Complex(0,0)
    // So re should differ: PI/2 vs 0
    expect(result.re).not.toBe(0);
    expect(result.re).toBeCloseTo(Math.PI / 2, 5);
  });
});