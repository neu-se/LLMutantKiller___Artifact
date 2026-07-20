import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should return correct asec for a purely imaginary number with zero real part', () => {
    // a=0, b=2: original gives new Complex(0, -Infinity).acos()
    // mutated gives new Complex(NaN, -Infinity).acos() which is NaN
    const result = new Complex(0, 2).asec();
    expect(result.isNaN()).toBe(false);
  });
});