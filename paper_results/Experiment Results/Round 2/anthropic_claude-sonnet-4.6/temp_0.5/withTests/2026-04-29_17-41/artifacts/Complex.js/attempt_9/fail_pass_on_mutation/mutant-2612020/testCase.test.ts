import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse scientific notation string correctly", () => {
    const c = new Complex("1e2+3i");
    expect(c.re).toBe(100);
    expect(c.im).toBe(3);
  });
});