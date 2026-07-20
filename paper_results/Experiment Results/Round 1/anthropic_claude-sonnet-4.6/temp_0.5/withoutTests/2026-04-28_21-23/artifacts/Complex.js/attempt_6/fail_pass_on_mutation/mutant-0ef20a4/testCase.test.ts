import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should return INFINITY constant (not NaN) when inverting zero", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    // Original returns Complex.INFINITY with re=Infinity, im=Infinity
    // Mutated skips zero check, d=0, returns new Complex(0/0, -0/0) = NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isFinite(result.re)).toBe(false);
    expect(result.re).toBe(Infinity);
  });
});