import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech', () => {
  it('detects mutation in else branch when d underflows to zero but isZero is false', () => {
    const c = new Complex(5e-200, 5e-200);
    const result = c.asech();
    // Original: new Complex(Infinity, -Infinity).acosh()
    // Mutated: new Complex(Infinity, 0).acosh()
    const mutatedExpected = new Complex(Infinity, 0).acosh();
    // The mutated result would equal acosh(Infinity + 0i)
    // Original result should differ from mutated
    expect(result.re === mutatedExpected.re && result.im === mutatedExpected.im).toBe(false);
  });
});