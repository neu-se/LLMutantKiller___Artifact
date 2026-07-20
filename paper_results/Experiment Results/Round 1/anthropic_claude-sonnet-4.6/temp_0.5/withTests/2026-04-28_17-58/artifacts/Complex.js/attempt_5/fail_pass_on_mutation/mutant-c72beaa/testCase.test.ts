import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot(0) should equal PI/2", () => {
    const result = new Complex(0, 0).acot();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(0);
  });
});