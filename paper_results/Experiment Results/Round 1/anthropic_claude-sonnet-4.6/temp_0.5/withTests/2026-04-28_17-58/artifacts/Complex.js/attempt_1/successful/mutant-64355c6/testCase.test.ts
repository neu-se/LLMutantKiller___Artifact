import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('asec mutation detection', () => {
  it('should correctly compute asec(i) where a=0 and b=1, not returning (0, Infinity)', () => {
    // asec(0 + 1i): a=0, b=1
    // Original: d = 0*0 + 1*1 = 1, returns new Complex(0/1, -1/1).acos() = new Complex(0, -1).acos()
    // Mutated: returns new Complex(0, Infinity) because condition is (a === 0 && true)
    const result = new Complex(0, 1).asec();
    
    // The result should NOT be (0, Infinity) as the mutant would return
    // The correct result of asec(i) = acos(1/i) = acos(-i)
    // acos(-i): using the formula, this should give a finite imaginary part
    expect(result.im).not.toBe(Infinity);
    expect(isFinite(result.im)).toBe(true);
    expect(isFinite(result.re)).toBe(true);
  });
});