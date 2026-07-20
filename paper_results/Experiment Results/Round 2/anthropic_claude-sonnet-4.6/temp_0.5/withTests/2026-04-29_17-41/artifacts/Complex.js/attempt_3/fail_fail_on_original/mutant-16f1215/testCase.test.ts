import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should not return NaN for acsc(0 + Number.MIN_VALUE * i) where d underflows to zero", () => {
    // When a=0 and b=Number.MIN_VALUE, d = a*a + b*b underflows to 0
    // The early return (a===0 && b===0) does NOT fire since b !== 0
    // So we reach the d===0 fallback branch:
    //   Original:  new Complex((a !== 0) ? a/0 : 0, ...) => new Complex(0, ...)
    //   Mutated:   new Complex((true) ? a/0 : 0, ...)    => new Complex(NaN, ...)
    const result = new Complex(0, Number.MIN_VALUE).acsc();
    expect(result.isNaN()).toBe(false);
  });
});