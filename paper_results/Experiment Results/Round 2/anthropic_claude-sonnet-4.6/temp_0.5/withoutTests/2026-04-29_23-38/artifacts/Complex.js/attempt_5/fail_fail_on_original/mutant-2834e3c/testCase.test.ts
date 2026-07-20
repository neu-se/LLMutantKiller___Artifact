import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech', () => {
  it('detects mutation by checking asech result for tiny complex number causing d underflow', () => {
    // With 5e-200 + 5e-200i: d = a^2 + b^2 underflows to 0, but isZero() is false
    // Original else branch: new Complex(Infinity, -Infinity).acosh()
    // Mutated else branch: new Complex(Infinity, 0).acosh()
    const originalIntermediate = new Complex(Infinity, -Infinity).acosh();
    const mutatedIntermediate = new Complex(Infinity, 0).acosh();
    
    // Verify these actually differ so our test is meaningful
    const differ = originalIntermediate.re !== mutatedIntermediate.re || 
                   originalIntermediate.im !== mutatedIntermediate.im ||
                   (isNaN(originalIntermediate.re) !== isNaN(mutatedIntermediate.re)) ||
                   (isNaN(originalIntermediate.im) !== isNaN(mutatedIntermediate.im));
    
    const c = new Complex(5e-200, 5e-200);
    const result = c.asech();
    
    // Result should match original intermediate, not mutated
    const matchesOriginal = (isNaN(result.re) === isNaN(originalIntermediate.re)) &&
                            (isNaN(result.im) === isNaN(originalIntermediate.im));
    const matchesMutated = (isNaN(result.re) === isNaN(mutatedIntermediate.re)) &&
                           (isNaN(result.im) === isNaN(mutatedIntermediate.im)) &&
                           (!isNaN(result.re) ? Math.abs(result.re - mutatedIntermediate.re) < 1e-10 : true) &&
                           (!isNaN(result.im) ? Math.abs(result.im - mutatedIntermediate.im) < 1e-10 : true);
    
    expect(matchesOriginal).toBe(true);
    expect(matchesMutated).toBe(false);
  });
});