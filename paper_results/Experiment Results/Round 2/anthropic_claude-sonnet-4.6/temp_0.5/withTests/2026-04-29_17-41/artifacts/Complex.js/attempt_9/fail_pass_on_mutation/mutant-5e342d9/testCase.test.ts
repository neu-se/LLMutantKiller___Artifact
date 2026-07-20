import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs large re small im", () => {
  it("abs of 5000+1i is approximately 5000", () => {
    const c = new Complex(5000, 1);
    const expected = Math.sqrt(5000 * 5000 + 1);
    expect(c.abs()).toBeCloseTo(expected, 5);
  });
});