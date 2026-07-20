import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot with negative subnormal imaginary part gives NaN result", () => {
    // b = -Number.MIN_VALUE: b !== 0, b*b underflows to 0, d = 0
    // Original: -b/0 = -(-MIN_VALUE)/0 = +Infinity -> atan(0, +Infinity)
    // Mutated:  +b/0 = +(-MIN_VALUE)/0 = -Infinity -> atan(0, -Infinity)
    // Both give NaN through atan
    const result = new Complex(0, -Number.MIN_VALUE).acot();
    expect(result.isNaN()).toBe(true);
  });
});