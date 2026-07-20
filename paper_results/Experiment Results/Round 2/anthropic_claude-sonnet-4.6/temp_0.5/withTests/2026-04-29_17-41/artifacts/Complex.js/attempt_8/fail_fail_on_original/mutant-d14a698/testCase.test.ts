import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('asec of purely imaginary number with definite d underflow', () => {
    // b = 5e-200: b*b = 2.5e-400 which underflows to 0
    // a = 0: early check (a===0 && b===0) bypassed since b != 0
    // d = 0*0 + b*b = 0 (underflow)
    // original: new Complex(0, -b/0).acos() = new Complex(0, -Inf).acos()
    // mutated:  new Complex(0, +b/0).acos() = new Complex(0, +Inf).acos()
    const b = 5e-200;
    expect(b * b).toBe(0); // confirm underflow
    const c = new Complex(0, b);
    const result = c.asec();
    // acos(0, -Inf) = Complex(PI/2, Inf) - not NaN
    // acos(0, +Inf) = NaN
    expect(result.isNaN()).toBe(false);
  });
});