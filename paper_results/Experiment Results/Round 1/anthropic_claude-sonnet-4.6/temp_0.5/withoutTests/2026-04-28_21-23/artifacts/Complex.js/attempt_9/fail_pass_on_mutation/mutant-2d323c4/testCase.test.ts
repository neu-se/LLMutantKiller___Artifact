import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch with a=0 and b=MIN_VALUE where d underflows to 0", () => {
    // With a=0, b=MIN_VALUE: d = 0 + 0 = 0 (b*b underflows)
    // Original else: Complex(0, -Inf).asinh() 
    // Mutated if: Complex(NaN, -Inf).asinh()
    // Test that result matches what Complex(0, -Inf).asinh() gives
    const expected = new Complex(0, -Infinity).asinh();
    const z = new Complex(0, Number.MIN_VALUE);
    const result = z.acsch();
    expect(result.re).toBe(expected.re);
    expect(result.im).toBe(expected.im);
  });
});