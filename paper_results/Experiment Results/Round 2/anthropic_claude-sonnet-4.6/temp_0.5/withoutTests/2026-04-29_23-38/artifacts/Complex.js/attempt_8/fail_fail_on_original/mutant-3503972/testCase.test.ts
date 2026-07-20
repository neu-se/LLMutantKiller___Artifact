import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch with b=1e-163 negative where b*b underflows to zero", () => {
    // 1e-163 * 1e-163 = 1e-326 < 5e-324 = Number.MIN_VALUE, so underflows to 0
    // With a=0, b=-1e-163: d=0, b!=0, b<0
    // Original: new Complex(0, -b/0) = new Complex(0, +Infinity).asinh()
    // Mutated:  new Complex(0, +b/0) = new Complex(0, -Infinity).asinh()
    // asinh(0, +Inf) -> (Inf, pi/2) [not NaN]
    // asinh(0, -Inf) -> NaN
    const b = -1e-163;
    const z = new Complex(0, b);
    const result = z.acsch();
    expect(result.isNaN()).toBe(false);
    expect(result.re).toBe(Infinity);
  });
});