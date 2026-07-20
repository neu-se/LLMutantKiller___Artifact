import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse a negative imaginary string correctly", () => {
    const c = new Complex("-3i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(-3);
  });
});