import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot(0, 0.5) returns correct value", () => {
    const result = new Complex(0, 0.5).acot();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(-Math.log(3) / 2, 10);
  });
});