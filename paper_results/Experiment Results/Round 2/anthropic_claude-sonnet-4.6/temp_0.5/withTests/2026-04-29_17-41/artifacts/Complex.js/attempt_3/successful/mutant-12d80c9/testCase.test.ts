import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech mutation detection", () => {
  it("should differ between original and mutated when d underflows to zero with non-zero a", () => {
    // With a = 5e-324 (smallest positive double), a*a underflows to 0
    // So d = 0, but a !== 0
    // Original: new Complex(a/0=Infinity, 0).acosh() 
    // Mutated:  new Complex(0, 0).acosh()
    // These produce different results
    const tiny = 5e-324;
    const c = new Complex(tiny, 0);
    const result = c.asech();
    // Complex(0,0).acosh() result
    const zeroResult = new Complex(0, 0).acosh();
    // They should NOT be equal in original (original goes through Infinity path)
    // In mutated they would be equal
    expect(result.re).not.toEqual(zeroResult.re);
  });
});