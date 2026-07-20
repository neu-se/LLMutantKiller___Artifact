import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add method with infinity", () => {
  it("should return INFINITY (not NaN) when adding finite complex to infinite complex", () => {
    const finite = new Complex(3, 4);
    const result = finite.add(Complex.INFINITY);
    // In original: returns Complex.INFINITY singleton (re=Infinity, im=Infinity)
    // In mutated: falls through to new Complex(3+Infinity, 4+Infinity) = new Complex(Infinity, Infinity)
    // Both seem infinite... try with a number that causes NaN
    const result2 = new Complex(Infinity, 0).add(new Complex(3, 4));
    // this.isInfinite() = true (Infinity, 0 is infinite), z.isInfinite() = false
    // Original: returns Complex.INFINITY
    // Mutated: falls through to new Complex(Infinity+3, 0+4) = new Complex(Infinity, 4)
    // new Complex(Infinity, 4).isInfinite() = true but im !== Infinity
    expect(result2.im).toBe(Infinity);
  });
});