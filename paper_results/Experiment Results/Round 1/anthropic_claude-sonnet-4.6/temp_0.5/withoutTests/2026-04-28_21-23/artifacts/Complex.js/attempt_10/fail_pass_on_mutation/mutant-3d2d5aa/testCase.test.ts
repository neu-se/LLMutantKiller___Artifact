import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('acoth fallback: result for tiny positive a should not equal zero', () => {
    // Force d=0 by using Number.MIN_VALUE whose square underflows
    const a = Number.MIN_VALUE; // 5e-324
    const b = 0;
    // d = a*a + b*b = 0 (underflow) but a !== 0
    // Original: Complex(Infinity, 0).atanh() -> NaN (not 0)
    // Mutant: Complex(0, 0).atanh() -> (0, 0) -> re === 0
    const c = new Complex(a, b);
    const result = c.acoth();
    // The mutant would give re=0, im=0
    // The original gives re=NaN, im=NaN
    // So: if mutant, equals(0,0) is true; if original, equals(0,0) is false
    expect(result.equals(0, 0)).toBe(false);
  });
});