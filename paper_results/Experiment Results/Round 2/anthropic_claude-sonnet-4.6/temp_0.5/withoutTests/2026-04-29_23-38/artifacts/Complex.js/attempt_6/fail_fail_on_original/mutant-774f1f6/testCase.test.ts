import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex construction with null second argument", () => {
  it("should correctly handle when second argument b is null", () => {
    // If condition checks b === null, then in original z['re'] = z['im'] = 0
    // In mutated z[""] = z['im'] = 0, meaning z['re'] stays at 0 but...
    // Actually if b is null and the else-if checks b !== undefined,
    // null !== undefined is TRUE, so else-if would fire: z['re'] = a, z['im'] = null
    const c = new Complex(3, null as any);
    expect(c.re).toBe(3);
    expect(c.im).toBe(0);
  });
});