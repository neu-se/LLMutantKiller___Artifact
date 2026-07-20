import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs large values", () => {
  it("abs of Complex(3000, 4000) should equal 5000", () => {
    const c = new Complex(3000, 4000);
    expect(c.abs()).toBeCloseTo(5000, 5);
  });
});