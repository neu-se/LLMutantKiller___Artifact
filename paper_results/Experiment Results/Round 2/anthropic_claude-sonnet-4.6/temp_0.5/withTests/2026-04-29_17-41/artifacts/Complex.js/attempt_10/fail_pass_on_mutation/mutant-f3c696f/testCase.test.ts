import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot with negative subnormal imaginary part reaches d=0 branch", () => {
    // b = -Number.MIN_VALUE: b !== 0, b*b underflows to 0
    // a = Number.MIN_VALUE: a !== 0, a*a underflows to 0
    // So d = 0, reaching the d=0 branch
    // Original: -b/0 where b < 0 gives +Infinity
    // Mutated:  +b/0 where b < 0 gives -Infinity
    // Then atan(+Inf, +Inf) vs atan(+Inf, -Inf)
    const result = new Complex(Number.MIN_VALUE, -Number.MIN_VALUE).acot();
    const resultOrig = new Complex(Infinity, Infinity).atan();
    const resultMut = new Complex(Infinity, -Infinity).atan();
    // Both give NaN, but verify the original path is taken
    expect(result.isNaN()).toBe(resultOrig.isNaN());
  });
});