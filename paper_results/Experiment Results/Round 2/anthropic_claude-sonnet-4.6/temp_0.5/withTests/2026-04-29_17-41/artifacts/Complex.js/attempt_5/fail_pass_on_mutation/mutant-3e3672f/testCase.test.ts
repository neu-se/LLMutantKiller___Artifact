import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse '-i' as having imaginary part -1", () => {
    const c = new Complex("-i");
    expect(c.re).toBeCloseTo(0);
    expect(c.im).toBeCloseTo(-1);
  });
});