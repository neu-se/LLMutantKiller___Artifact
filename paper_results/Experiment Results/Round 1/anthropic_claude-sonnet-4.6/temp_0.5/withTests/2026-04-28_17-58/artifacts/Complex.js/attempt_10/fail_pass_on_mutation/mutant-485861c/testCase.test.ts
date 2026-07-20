import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex constructed from null", () => {
  it("should have re=0 such that arithmetic produces correct results", () => {
    const c = new Complex(null);
    // If re were undefined, this would produce NaN
    const result = c.add(new Complex(0, 0));
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    // Check that the parse function's z['re'] is properly 0
    // by verifying the complex number behaves as zero in all ways
    expect(c.re === 0).toBe(true);
    expect(c.im === 0).toBe(true);
    // In original: z[""] = z['im'] = 0 - the z['re'] stays at initialized 0
    // In mutated: z[""] = z[""] = 0; z['im'] = 0 - same result
    // The only difference: in original there's no extra z['im']=0 statement
    // Let's check if the "" key ends up on the complex object
    expect('' in c).toBe(false);
  });
});