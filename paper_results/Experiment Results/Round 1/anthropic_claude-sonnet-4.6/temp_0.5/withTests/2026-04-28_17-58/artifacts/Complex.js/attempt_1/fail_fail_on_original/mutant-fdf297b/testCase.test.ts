import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinite values", () => {
  it("should return NaN when subtracting a finite number from Infinity", () => {
    // In the original code, the first check is:
    //   if (this['isInfinite']() || z['isInfinite']()) { return Complex['NAN']; }
    // which means Infinity - finite = NaN
    //
    // In the mutated code, the first check is:
    //   if (this['isInfinite']() && z['isInfinite']()) { return Complex['NAN']; }
    // which means Infinity - finite would fall through to the second check:
    //   if (this['isInfinite']() || z['isInfinite']()) { return Complex['INFINITY']; }
    // and return Infinity instead of NaN

    const inf = Complex.INFINITY;
    const finite = new Complex(1, 2);
    const result = inf.sub(finite);

    // Original: Infinity - finite = NaN
    expect(result.isNaN()).toBe(true);
  });
});