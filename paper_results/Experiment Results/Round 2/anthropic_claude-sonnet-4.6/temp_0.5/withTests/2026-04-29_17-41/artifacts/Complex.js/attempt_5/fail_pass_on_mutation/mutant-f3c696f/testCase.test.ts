import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot(0, 2) returns correct value", () => {
    const result = new Complex(0, 2).acot();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.log(3) / 2, 10);
  });
});