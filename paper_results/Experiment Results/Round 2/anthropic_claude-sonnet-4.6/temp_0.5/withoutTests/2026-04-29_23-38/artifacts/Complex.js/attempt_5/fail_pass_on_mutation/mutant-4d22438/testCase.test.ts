import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs large values", () => {
  it("abs of Complex(3000, 9000) should be approximately 9487", () => {
    const c = new Complex(3000, 9000);
    const result = c.abs();
    expect(result).toBeCloseTo(Math.sqrt(3000*3000 + 9000*9000), 3);
  });
});