import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('acoth of real number 2 returns the correct atanh-based value', () => {
    // Original: d = 4+0 = 4, returns new Complex(2/4, 0).atanh() = new Complex(0.5, 0).atanh() ≈ 0.5493
    // Mutated: if(true) always returns new Complex(0, PI/2)
    const result = new Complex(2, 0).acoth();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});