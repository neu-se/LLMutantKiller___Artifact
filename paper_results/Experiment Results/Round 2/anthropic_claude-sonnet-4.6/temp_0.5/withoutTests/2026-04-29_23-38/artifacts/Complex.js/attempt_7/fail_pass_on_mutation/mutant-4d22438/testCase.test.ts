import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs very large values", () => {
  it("abs of Complex(30000, 40000) should equal 50000", () => {
    const c = new Complex(30000, 40000);
    expect(c.abs()).toBeCloseTo(50000, 3);
  });
});