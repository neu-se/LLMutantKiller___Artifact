import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should return Infinity for inverse of zero complex number", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    // Original: if (this['isZero']()) returns Complex['INFINITY'] with re=Infinity, im=Infinity
    // Mutated: if (false) skips this, computes d=0, returns new Complex(0/0, -0/0) = NaN
    expect(Number.isNaN(result.re)).toBe(false);
    expect(Number.isNaN(result.im)).toBe(false);
    expect(result.re).toEqual(Infinity);
  });
});