import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('asec of tiny positive imaginary number should not be NaN', () => {
    // a=0, b=Number.MIN_VALUE: d = b*b underflows to 0
    // early check (a===0 && b===0) is false since b != 0
    // original: new Complex(0, -b/0).acos() = new Complex(0, -Infinity).acos() -> finite result
    // mutated:  new Complex(0, +b/0).acos() = new Complex(0, +Infinity).acos() -> NaN
    const c = new Complex(0, Number.MIN_VALUE);
    const result = c.asec();
    expect(result.isNaN()).toBe(false);
  });
});