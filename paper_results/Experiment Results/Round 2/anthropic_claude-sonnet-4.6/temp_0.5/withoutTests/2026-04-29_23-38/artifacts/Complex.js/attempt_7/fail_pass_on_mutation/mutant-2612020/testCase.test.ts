import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("detects mutation by checking that string-parsed complex has no extra enumerable properties", () => {
    const c = new Complex("3+4i");
    // In original: z[""] = (z['re'] = 0) sets z[""] = 0 on the local parse object
    // In mutated: z[""] = (z[""] = 0) also sets z[""] = 0 on the local parse object
    // The local z object is not the Complex instance, so this shouldn't matter
    // But let's check if "" property leaks to Complex instance
    const keys = Object.keys(c);
    expect(keys).not.toContain("");
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
  });
});