import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing edge cases", () => {
  it("should parse scientific notation string correctly", () => {
    const c = new Complex("1e2+3e1i");
    expect(c.re).toBeCloseTo(100, 10);
    expect(c.im).toBeCloseTo(30, 10);
  });
});