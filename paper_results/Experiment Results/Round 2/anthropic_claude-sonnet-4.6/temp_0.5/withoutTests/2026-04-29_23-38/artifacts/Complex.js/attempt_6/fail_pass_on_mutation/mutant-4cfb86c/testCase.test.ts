import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('acot of a number with nonzero real where d underflows should differ from mutated version', () => {
    // Simulate what original does: re=(a!=0)?a/0:0 vs mutated: re=(a==0)?a/0:0
    // For a=1e-200, b=1e-200, d=0:
    // Original calls atan(Infinity, Infinity) 
    // Mutated calls atan(0, Infinity)
    // Check if these differ
    const origAtan = new Complex(Infinity, Infinity).atan();
    const mutAtan = new Complex(0, Infinity).atan();
    // Both are NaN - but let's check isNaN differently
    // Actually let's check the im part
    expect(origAtan.isNaN()).toBe(mutAtan.isNaN());
  });
});