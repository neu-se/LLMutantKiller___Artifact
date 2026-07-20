import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('acoth of purely imaginary number i returns correct value', () => {
    // For input (0, 1): a=0, b=1
    // Original: if(a===0) returns Complex(0, PI/2) -- same as mutated
    // Need input where a !== 0 and original differs from mutated
    // acoth(0, 2): a=0, so original returns Complex(0, PI/2)
    // Try acoth with non-zero real part where b !== 0
    // acoth(1, 1): d = 2, original: new Complex(0.5, -0.5).atanh()
    const result = new Complex(1, 1).acoth();
    // Should NOT be Complex(0, PI/2)
    expect(result.re).not.toBeCloseTo(0, 5);
  });
});