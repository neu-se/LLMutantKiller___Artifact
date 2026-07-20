import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation', () => {
  it('asec of purely imaginary number should return finite result matching acos(0, -b/d)', () => {
    // For input (0, 2): a=0, b=2, d=4
    // Original (d!==0 branch): new Complex(0/4, -2/4).acos() = new Complex(0, -0.5).acos() -> finite
    // Mutated (false branch): new Complex((true)?0/0:0, -Inf).acos() -> NaN
    const result = new Complex(0, 2).asec();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
  });
});