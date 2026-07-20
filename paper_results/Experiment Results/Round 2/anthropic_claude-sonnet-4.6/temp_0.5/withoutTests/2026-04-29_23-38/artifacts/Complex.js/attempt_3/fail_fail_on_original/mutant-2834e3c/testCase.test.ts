import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech', () => {
  it('should correctly compute asech when components are tiny causing d to underflow to zero', () => {
    // 5e-200 * 5e-200 underflows to 0, so d=0, but isZero() is false since re != 0
    // Original else branch: new Complex((a!==0)?a/0:0, (b!==0)?-b/0:0).acosh()
    //   = new Complex(Infinity, -Infinity).acosh()
    // Mutated else branch: new Complex((a!==0)?a/0:0, (false)?-b/0:0).acosh()
    //   = new Complex(Infinity, 0).acosh()
    const c = new Complex(5e-200, 5e-200);
    const original_intermediate = new Complex(Infinity, -Infinity);
    const mutated_intermediate = new Complex(Infinity, 0);
    const result = c.asech();
    const originalResult = original_intermediate.acosh();
    const mutatedResult = mutated_intermediate.acosh();
    // These should differ
    expect(result.re).toBeCloseTo(originalResult.re, 5);
    expect(result.im).toBeCloseTo(originalResult.im, 5);
  });
});