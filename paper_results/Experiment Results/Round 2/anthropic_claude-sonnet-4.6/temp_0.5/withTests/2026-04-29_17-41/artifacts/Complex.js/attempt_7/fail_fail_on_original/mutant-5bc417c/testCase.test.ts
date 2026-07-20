import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('acoth of zero returns correct value differing from PI/2', () => {
    const result = new Complex(0, 0).acoth();
    // Original: d=0, else branch: new Complex(0,0).atanh() = Complex(0,0)
    // Mutated: if(true) returns Complex(0, PI/2)
    expect(result.im).not.toBeCloseTo(Math.PI / 2, 10);
  });
});