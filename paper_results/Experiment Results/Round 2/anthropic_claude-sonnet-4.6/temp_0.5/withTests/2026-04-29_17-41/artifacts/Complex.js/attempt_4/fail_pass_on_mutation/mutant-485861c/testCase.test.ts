import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parse with null", () => {
  it("should set re to 0 when constructed with null", () => {
    const c = new Complex(null);
    // Test re is 0 - in mutated code the z['re'] assignment line context matters
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    // Add operation to verify the number behaves as zero
    const result = c.add(new Complex(3, 4));
    expect(result.re).toBe(3);
    expect(result.im).toBe(4);
  });
});