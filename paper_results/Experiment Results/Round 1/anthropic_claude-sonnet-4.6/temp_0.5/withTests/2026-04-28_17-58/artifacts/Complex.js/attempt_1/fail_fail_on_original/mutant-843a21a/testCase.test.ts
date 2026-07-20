import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("asech fallback branch: a/0 should give Infinity, not 0", () => {
    // The mutation is in the d===0 fallback of asech
    // d = a*a + b*b. For d to be 0 with a!=0, we'd need floating point underflow
    // We can simulate by directly testing what acosh(Infinity,0) vs acosh(0,0) gives
    // Original: new Complex(a/0, -b/0).acosh() = new Complex(Infinity, ...).acosh()
    // Mutated:  new Complex(a*0, -b*0).acosh() = new Complex(0, ...).acosh()
    // These give different results
    const resultWithInfinity = new Complex(Infinity, 0).acosh();
    const resultWithZero = new Complex(0, 0).acosh();
    // They should be different - this verifies the branch behavior
    // Now trigger the actual branch by using subnormal numbers
    // 5e-324 * 5e-324 = 0 due to underflow
    const tiny = 5e-324;
    const c = new Complex(tiny, 0);
    // d = tiny*tiny + 0 = 0 (underflow), a = tiny != 0
    // Original: new Complex(tiny/0, 0).acosh() = new Complex(Infinity, 0).acosh()
    // Mutated:  new Complex(tiny*0, 0).acosh() = new Complex(0, 0).acosh()
    const result = c.asech();
    // acosh(Infinity) = Infinity, acosh(0) = pi/2 * i
    // So result.re should be Infinity in original, but pi/2 in mutated (approximately)
    expect(result.re).toBe(Infinity);
  });
});