import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should return NaN for very small input where d underflows to zero', () => {
    // Number.MIN_VALUE squared underflows to 0, so d = a*a + b*b = 0
    // but a !== 0, so the else branch is taken
    // Original: new Complex(a/0, ...) = new Complex(Infinity, ...) -> acos -> NaN
    // Mutated: new Complex(a*0, ...) = new Complex(0, ...) -> acos -> finite value (~PI/2)
    const c = new Complex(Number.MIN_VALUE, 0);
    const result = c.asec();
    expect(result.isNaN()).toBe(true);
  });
});