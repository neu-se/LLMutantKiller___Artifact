import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should return Infinity imaginary part when asech is called with subnormal real part that causes d=0 underflow", () => {
    // When a = Number.MIN_VALUE (5e-324) and b = 0:
    // d = a*a + b*b = (5e-324)^2 + 0 = 0 (underflows to 0)
    // isZero() returns false because a !== 0
    // So we reach the d === 0 fallback branch
    // Original: (a !== 0) ? a / 0 : 0 => Infinity (since a > 0)
    // Mutated:  (a !== 0) ? a * 0 : 0 => 0
    // The resulting complex passed to acosh differs, giving different results
    const c = new Complex(Number.MIN_VALUE, 0);
    const result = c.asech();
    // With original code, the fallback creates Complex(Infinity, 0).acosh()
    // which should give a finite or infinite result, not NaN from Complex(0, 0).acosh()
    // With mutated code, it creates Complex(0, 0).acosh() which behaves differently
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});