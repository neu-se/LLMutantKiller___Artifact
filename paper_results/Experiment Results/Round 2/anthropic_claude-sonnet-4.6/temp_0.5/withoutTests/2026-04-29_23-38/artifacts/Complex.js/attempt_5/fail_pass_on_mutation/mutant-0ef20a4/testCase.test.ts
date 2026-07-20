import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should return Infinity (not NaN) when inverting zero", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    // Original code: isZero() check triggers, returns Complex.INFINITY
    // Mutated code: if(false) never triggers, falls through to NaN computation
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBe(Infinity);
  });
});