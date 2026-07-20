import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse a string with only a sign and imaginary unit", () => {
    // Test edge case string parsing
    const c = new Complex("+i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
  });
});