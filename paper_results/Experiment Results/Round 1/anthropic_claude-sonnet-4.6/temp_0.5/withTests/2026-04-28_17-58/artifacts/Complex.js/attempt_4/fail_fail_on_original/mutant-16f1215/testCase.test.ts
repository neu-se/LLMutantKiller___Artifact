import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acsc mutation detection', () => {
  it('acsc with tiny real and zero imaginary where d underflows should give finite result', () => {
    // Use a tiny non-zero a, b=0 so d = a*a underflows to 0
    // Early check: a===0 && b===0 is false (a != 0)
    // d = 0, so else branch: original gives (a!==0)?a/0:0 = Infinity, mutant gives (true)?a/0:0 = Infinity
    // Both same here. Need a=0 case.
    // Try: a=0, b=Number.MIN_VALUE - but that gives NaN from asin(-Infinity)
    // Instead verify the specific numeric output differs
    const tiny = Number.MIN_VALUE;
    const resultA = new Complex(tiny, 0).acsc();
    const resultB = new Complex(0, tiny).acsc();
    // For (tiny, 0): d=0, a!=0, both original and mutant give Infinity re
    // For (0, tiny): d=0, a==0, original gives 0 re, mutant gives NaN re
    expect(isNaN(resultB.re)).toBe(false);
  });
});