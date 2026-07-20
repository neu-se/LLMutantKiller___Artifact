import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('detects sign flip in imaginary part of asec for tiny imaginary input', () => {
    // With a=0, b=Number.MIN_VALUE: d = b*b underflows to 0
    // early check (a===0 && b===0) is false since b != 0
    // original: new Complex(0, -b/0).acos() = new Complex(0, -Infinity).acos()
    // mutated:  new Complex(0, +b/0).acos() = new Complex(0, +Infinity).acos()
    const negInfResult = new Complex(0, -Infinity).acos();
    const posInfResult = new Complex(0, Infinity).acos();
    // These should differ - verify our assumption
    const c = new Complex(0, Number.MIN_VALUE);
    const result = c.asec();
    // The imaginary part sign should match the -Infinity case (original), not +Infinity (mutated)
    expect(Math.sign(result.im)).toBe(Math.sign(negInfResult.im));
    expect(Math.sign(result.im)).not.toBe(Math.sign(posInfResult.im));
  });
});