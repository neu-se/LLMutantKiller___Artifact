import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc(0) real part should be PI/2", () => {
    const result = new Complex(0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
  });
});