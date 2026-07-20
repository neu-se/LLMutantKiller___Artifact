import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should return NaN for acsch(0 + Number.MIN_VALUE * i) due to subnormal underflow", () => {
    const b = Number.MIN_VALUE; // 5e-324
    // b*b underflows to 0, so d = 0, triggering fallback
    // Original: new Complex(0, -b/0).asinh() = new Complex(0, -Inf).asinh() = NaN
    // Mutated:  new Complex(0, +b/0).asinh() = new Complex(0, +Inf).asinh() = {Inf, PI/2}
    const result = new Complex(0, b).acsch();
    expect(result.isNaN()).toBe(true);
  });
});