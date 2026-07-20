import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with negative imaginary unit", () => {
  it("should correctly parse '-i' as a complex number with imaginary part -1", () => {
    const c = new Complex("-i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(-1);
  });
});