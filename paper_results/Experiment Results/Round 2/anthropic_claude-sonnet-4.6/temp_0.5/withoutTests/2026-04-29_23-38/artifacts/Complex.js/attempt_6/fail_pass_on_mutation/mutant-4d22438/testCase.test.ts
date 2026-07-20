import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs with negative real part", () => {
  it("abs of Complex(-3000, 4000) should equal 5000", () => {
    const c = new Complex(-3000, 4000);
    expect(c.abs()).toBeCloseTo(5000, 3);
  });
});