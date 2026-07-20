import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with double negation", () => {
  it("should correctly parse '--3' as real part 3", () => {
    const c = new Complex("--3");
    expect(c.re).toBeCloseTo(3);
    expect(c.im).toBeCloseTo(0);
  });
});