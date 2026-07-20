import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN validation", () => {
  it("should propagate NaN correctly when only imaginary part is NaN", () => {
    // With original (||): NaN check triggers for re=0, im=NaN
    // With mutated (&&): NaN check does NOT trigger for re=0, im=NaN
    // Since block is empty, both allow through - but let's check valueOf behavior
    const c = new Complex({ re: 0, im: NaN });
    // In original: im=NaN, so valueOf returns null (im !== 0)
    // In mutated: same result
    // Try: equals should return false for NaN
    expect(c.equals(0, NaN)).toBe(false);
  });
});