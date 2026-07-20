import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should return NaN-free result for asec with zero real part and nonzero imaginary part', () => {
    // a=0, b=2, d=4 != 0
    // Original: new Complex((0!==0)?0/0:0, (-2/4)).acos() = new Complex(0, -0.5).acos()
    // Mutated:  new Complex((true)?0/0:0, (-2/4)).acos()  = new Complex(NaN, -0.5).acos() -> NaN
    const result = new Complex(0, 2).asec();
    expect(result.isNaN()).toBe(false);
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});