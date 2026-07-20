import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch of number with zero real and small negative imaginary has correct sign", () => {
    // a=0, b=-1e-200: b !== 0 so early return not triggered, d = b^2 underflows to 0
    // Original: new Complex(0, -b/0).asinh() where b=-1e-200 => new Complex(0, +Inf).asinh() = (+Inf, +Inf)
    // Mutated:  new Complex(0, +b/0).asinh() where b=-1e-200 => new Complex(0, -Inf).asinh() = (-Inf, -Inf)
    const z = new Complex(0, -1e-200);
    const result = z.acsch();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});