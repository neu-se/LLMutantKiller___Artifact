import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth(2) should return the correct mathematical value, not 0+PI/2*i", () => {
    const result = new Complex(2, 0).acoth();
    expect(result.re).toBeCloseTo(Math.log(3) / 2, 10);
  });
});