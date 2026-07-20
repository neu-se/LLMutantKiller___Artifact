import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should correctly handle construction with null first argument and numeric second argument", () => {
    // Testing the exact null branch behavior
    // Original: z['re'] = z['im'] = 0 (both explicitly set to 0)
    // Mutated: z[""] = z['im'] = 0 (only im explicitly set, re stays 0 from init)
    // These are equivalent... unless we can find a case where re needs to be reset
    // 
    // What if we test that the null branch takes PRIORITY over b !== undefined?
    // With a=null, b=5: null branch fires, both should be 0
    const c = new Complex(null as any, 5);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});