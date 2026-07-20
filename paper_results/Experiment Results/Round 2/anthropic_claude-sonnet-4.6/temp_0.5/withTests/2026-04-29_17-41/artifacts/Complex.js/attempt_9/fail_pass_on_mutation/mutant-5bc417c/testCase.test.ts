import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('acoth where d would be zero should use fallback branch', () => {
    // In original: return (d !== 0) where d = a*a + b*b
    // When a=0, b=0 after passing initial guard: d=0, uses else branch -> valid result
    // In mutated: return (true) always uses first branch with potentially undefined d
    // If d is declared AFTER the return statement (var hoisting = undefined),
    // then a/undefined = NaN
    // Test with input that reaches placeholder with d=0
    // Since var is hoisted, in mutated: d=undefined, NaN result
    const result = new Complex(0, 0).acoth();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});