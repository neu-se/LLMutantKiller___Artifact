import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects sign mutation via asin behavior with infinite imaginary', () => {
    // Direct test: asin(0, -Inf) should differ from asin(0, +Inf)
    const negInfResult = new Complex(0, -Infinity).asin();
    const posInfResult = new Complex(0, Infinity).asin();
    // If these differ, then acsc with tiny b will differ between original and mutated
    // Original acsc(0, tiny>0): calls asin(0, -Inf) 
    // Mutated  acsc(0, tiny>0): calls asin(0, +Inf)
    expect(negInfResult.im).not.toEqual(posInfResult.im);
  });
});