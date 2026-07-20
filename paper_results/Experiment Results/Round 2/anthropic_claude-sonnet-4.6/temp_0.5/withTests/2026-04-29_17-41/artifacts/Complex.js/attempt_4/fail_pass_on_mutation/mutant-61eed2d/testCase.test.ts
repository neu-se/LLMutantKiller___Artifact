import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse a string where im accumulation depends on being initialized to 0", () => {
    // Parse a string with multiple imaginary terms to verify im is correctly accumulated from 0
    const c = new Complex("1i+2i+3i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(6);
  });
});