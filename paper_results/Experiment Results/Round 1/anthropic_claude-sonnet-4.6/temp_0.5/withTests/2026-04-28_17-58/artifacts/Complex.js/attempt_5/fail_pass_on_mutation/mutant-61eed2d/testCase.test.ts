import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse string where re accumulation depends on re being reset to 0", () => {
    // The z['re'] = 0 reset in the string branch is key - it resets re which was 
    // already 0 from object literal. Both mutations do this reset.
    // The only observable difference: in mutated code z[""] = 0 is set on parse's z object
    // This doesn't affect the Complex instance since only re/im are copied.
    // Test parsing a complex number from string to verify correct values
    const c = new Complex("2+3i");
    expect(c.re).toBe(2);
    expect(c.im).toBe(3);
    // Verify the toString round-trip works
    expect(new Complex(c.toString()).re).toBe(2);
    expect(new Complex(c.toString()).im).toBe(3);
  });
});