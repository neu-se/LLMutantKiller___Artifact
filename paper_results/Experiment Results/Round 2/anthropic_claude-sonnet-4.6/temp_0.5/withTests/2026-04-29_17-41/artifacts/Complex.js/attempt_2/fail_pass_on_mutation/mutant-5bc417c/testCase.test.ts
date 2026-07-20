import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('acoth of zero should return correct value without throwing', () => {
    // When a=0, b=0: d = 0*0 + 0*0 = 0
    // Original: (d !== 0) is false, so goes to else branch: new Complex(0, 0).atanh()
    // Mutated: (true) always, so goes to: new Complex(0/0, -0/0).atanh() = new Complex(NaN, NaN).atanh()
    const result = new Complex(0, 0).acoth();
    expect(result.isNaN()).toBe(false);
  });
});