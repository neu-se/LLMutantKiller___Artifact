import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add method", () => {
  it("should return proper INFINITY with both re and im infinite when adding finite to infinity", () => {
    const finite = new Complex(3, 4);
    const result = finite.add(Complex['INFINITY']);
    // Original returns Complex.INFINITY which has re=Infinity, im=Infinity
    // Mutated falls through: re=3+Infinity=Infinity, im=4+Infinity=Infinity - same!
    // Need one-sided infinity
    const oneWayInfinite = new Complex(Infinity, 0);
    const result2 = finite.add(oneWayInfinite);
    // Original: returns Complex.INFINITY (re=Infinity, im=Infinity)
    // Mutated: re=3+Infinity=Infinity, im=4+0=4 -> isInfinite()=true but im=4
    expect(result2['im']).toBe(Infinity);
  });
});