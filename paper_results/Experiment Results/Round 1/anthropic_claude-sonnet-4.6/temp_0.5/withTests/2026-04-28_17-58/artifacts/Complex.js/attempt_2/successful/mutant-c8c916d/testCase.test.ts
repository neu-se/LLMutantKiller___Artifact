import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should return correct value for acsc when a is non-zero and d is zero (via object with NaN-producing arithmetic)", () => {
    // Force the d===0 branch with a !== 0 by using a complex number
    // where a*a + b*b underflows to 0 but a != 0
    // Use Number.MIN_VALUE: MIN_VALUE * MIN_VALUE = 0 (underflow), but a !== 0
    const tiny = Number.MIN_VALUE;
    const c = new Complex(tiny, 0);
    // d = tiny*tiny + 0 = 0 (underflow), a = tiny !== 0
    // Original: (a !== 0) ? a/0 : 0 => Infinity
    // Mutated:  (false)   ? a/0 : 0 => 0
    // Then .asin() is called on Complex(Infinity, 0) vs Complex(0, 0)
    const result = c.acsc();
    // Original path: new Complex(tiny/0, -0/0).asin() = new Complex(Infinity, NaN).asin()
    // Actually a/d = tiny/0 = Infinity, -b/d = 0/0 = NaN
    // Mutated path: new Complex(0, 0).asin() = Complex(0, 0)
    // So result should NOT equal (0, 0) in original
    expect(result.re === 0 && result.im === 0).toBe(false);
  });
});