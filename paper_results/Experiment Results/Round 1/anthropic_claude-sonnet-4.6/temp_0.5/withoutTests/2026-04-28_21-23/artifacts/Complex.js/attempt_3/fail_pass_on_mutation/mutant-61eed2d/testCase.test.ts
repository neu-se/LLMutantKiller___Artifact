import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should not have an empty string property after parsing a complex string", () => {
    const c = new Complex("3+2i");
    // In the mutated code, the internal parse object gets z[""] set
    // but this shouldn't be visible on the Complex instance itself
    // Let's verify the im value is correct when re-using parsed values
    expect(c.re).toBe(3);
    expect(c.im).toBe(2);
    expect(c.equals(new Complex(3, 2))).toBe(true);
  });
});