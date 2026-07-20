import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing real part", () => {
  it("should parse string with only imaginary part leaving re as 0", () => {
    const c = new Complex("5i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(5);
  });
});