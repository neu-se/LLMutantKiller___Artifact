import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex with explicit undefined", () => {
  it("should parse undefined as zero complex number with re=0", () => {
    // Testing that z['re'] is 0 when null passed - original sets z[""] = z['im'] = 0
    // but z['re'] starts as 0 anyway
    // Let's verify the chained assignment doesn't accidentally set z['re']
    const c = new Complex(undefined);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    // The "" property in original: z[""] = 0 (from chain)
    // In mutated: z[""] = 0 (direct)  
    // Check that the complex number behaves as zero
    const sum = c.add(new Complex(3, 4));
    expect(sum.re).toBe(3);
    expect(sum.im).toBe(4);
  });
});