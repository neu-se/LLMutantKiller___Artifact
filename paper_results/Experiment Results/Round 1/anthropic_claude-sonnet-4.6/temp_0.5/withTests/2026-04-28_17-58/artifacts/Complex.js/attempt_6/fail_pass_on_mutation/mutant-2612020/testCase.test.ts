import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse a string representation back to original values", () => {
    // Test that re is properly initialized to 0 before string parsing accumulation
    // by checking a string that has only imaginary component
    const c = new Complex("0+1i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
    expect(c.toString()).toBe("i");
  });
});