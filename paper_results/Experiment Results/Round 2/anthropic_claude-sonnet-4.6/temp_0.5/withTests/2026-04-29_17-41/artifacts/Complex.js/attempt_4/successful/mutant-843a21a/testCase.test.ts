import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should not produce NaN for asech with subnormal value - original gives NaN, mutated gives non-NaN", () => {
    // With a = Number.MIN_VALUE, a*a = 0 in IEEE 754, so d = 0
    // isZero() is false since a !== 0
    // Original: new Complex(a/0=Infinity, 0).acosh() -> NaN (acosh of Infinity)
    // Mutated:  new Complex(a*0=0, 0).acosh() -> acosh(0) which is pi/2 * i (not NaN)
    const a = Number.MIN_VALUE;
    const z = new Complex(a, 0);
    const result = z.asech();
    
    // Original gives NaN, mutated gives non-NaN result
    // So on original: isNaN() === true; on mutated: isNaN() === false
    expect(result.isNaN()).toBe(true);
  });
});