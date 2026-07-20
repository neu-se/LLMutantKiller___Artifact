import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse complex string with negative imaginary part correctly", () => {
    const c = new Complex("3-4i");
    expect(c.re).toBeCloseTo(3, 10);
    expect(c.im).toBeCloseTo(-4, 10);
  });
});