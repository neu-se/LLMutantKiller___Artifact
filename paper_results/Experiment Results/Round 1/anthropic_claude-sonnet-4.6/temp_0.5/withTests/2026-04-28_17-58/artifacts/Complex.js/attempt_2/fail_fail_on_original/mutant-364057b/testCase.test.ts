import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech fallback branch", () => {
  it("asech with extremely small non-zero real part should return Infinity real part not NaN", () => {
    // Use a value so small that a*a + b*b underflows to 0 (d === 0),
    // but a !== 0, triggering the fallback branch.
    // Original: (a !== 0) ? a/0 : 0  => Infinity
    // Mutated:  (a === 0) ? a/0 : 0  => 0
    const tiny = 5e-324; // smallest positive double (denormalized)
    const c = new Complex(tiny, 0);
    // isZero() returns false since re !== 0
    // d = tiny*tiny + 0 = 0 (underflows)
    // So fallback branch is taken
    // Original: a !== 0 => a/0 = Infinity => re = Infinity
    // Mutated:  a === 0 is false => 0 => re = 0
    const result = c.asech();
    // Original code: re part of acosh(Infinity) which should be Infinity
    expect(result.re).toBe(Infinity);
  });
});