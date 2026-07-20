import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('acsch(1+i) returns finite result - original uses d=a²+b², mutated uses d=a²-b²=0 causing NaN', () => {
    const result = new Complex(1, 1).acsch();
    // Original: d = 1+1 = 2, computes new Complex(0.5, -0.5).asinh() = finite
    // Mutated:  d = 1-1 = 0, computes new Complex(Inf, -Inf).asinh() = NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});