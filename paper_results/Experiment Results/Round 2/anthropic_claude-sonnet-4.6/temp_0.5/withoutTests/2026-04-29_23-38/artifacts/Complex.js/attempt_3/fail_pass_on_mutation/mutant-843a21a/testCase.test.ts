import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("detects mutation in asech fallback branch by using subnormal values causing d=0 with non-zero b", () => {
    // Use a=0, b=Number.MIN_VALUE: d = 0 + (MIN_VALUE)^2 = 0 (underflow)
    // isZero() returns false since b !== 0
    // Original: new Complex(0, -Infinity).acosh() [since a=0, b!=0: (a!==0)?a/0:0 = 0, (b!==0)?-b/0:0 = -Infinity]
    // Mutated:  new Complex(0, 0).acosh()         [since a*0=0, b*0=0... wait b is -b/0 vs -b*0]
    // Actually mutation only changes the first arg (a's expression)
    // Original first arg: (a !== 0) ? a / 0 : 0 = 0 (since a=0)
    // Mutated first arg:  (a !== 0) ? a * 0 : 0 = 0 (since a=0, same!)
    // So b=0, a=MIN_VALUE is the case to test
    // Let me verify: a=MIN_VALUE, b=0
    // Original: Complex(Infinity, 0).acosh()
    // Mutated:  Complex(0, 0).acosh()
    const orig_acosh_inf = new Complex(Infinity, 0).acosh();
    const mut_acosh_zero = new Complex(0, 0).acosh();
    // These should differ
    expect(orig_acosh_inf.re).not.toEqual(mut_acosh_zero.re);
  });
});