import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add method", () => {
  it("should return Infinity when adding Complex(Infinity, 0) to a finite complex number", () => {
    // Complex(Infinity, 0) is infinite (re=Inf, im=0)
    // finite + Complex(Infinity, 0): in original returns INFINITY
    // in mutated: re = finite + Infinity = Infinity, im = finite + 0 = finite -> NOT infinite, NOT NaN
    const finite = new Complex(3, 4);
    const oneWayInfinite = new Complex(Infinity, 0);
    const result = finite.add(oneWayInfinite);
    expect(result.isInfinite()).toBe(true);
  });
});