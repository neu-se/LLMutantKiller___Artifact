import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs equal large values", () => {
  it("abs of 3000+3000i equals 3000*sqrt(2)", () => {
    const c = new Complex(3000, 3000);
    const expected = 3000 * Math.sqrt(2);
    expect(c.abs()).toBeCloseTo(expected, 5);
  });
});