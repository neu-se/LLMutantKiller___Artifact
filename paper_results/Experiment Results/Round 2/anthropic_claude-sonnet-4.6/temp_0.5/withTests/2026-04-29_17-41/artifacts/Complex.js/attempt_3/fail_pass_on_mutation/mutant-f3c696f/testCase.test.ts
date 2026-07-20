import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot with subnormal imaginary part that causes d to underflow to zero", () => {
    // Number.MIN_VALUE * Number.MIN_VALUE underflows to 0
    // So d = 0 while b !== 0, reaching the d===0 branch
    // Original: imaginary = -b/0 = -Infinity, then atan(0, -Inf)
    // Mutated:  imaginary = +b/0 = +Infinity, then atan(0, +Inf)
    const result = new Complex(0, Number.MIN_VALUE).acot();
    // Both give NaN through atan, so check isNaN
    expect(result.isNaN()).toBe(true);
  });
});