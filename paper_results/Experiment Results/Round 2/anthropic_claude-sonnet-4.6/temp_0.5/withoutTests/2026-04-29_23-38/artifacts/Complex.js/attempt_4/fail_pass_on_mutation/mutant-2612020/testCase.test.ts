import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse negative imaginary string correctly", () => {
    const c = new Complex("-i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(-1);
    expect(c.toString()).toBe("-i");
  });
});