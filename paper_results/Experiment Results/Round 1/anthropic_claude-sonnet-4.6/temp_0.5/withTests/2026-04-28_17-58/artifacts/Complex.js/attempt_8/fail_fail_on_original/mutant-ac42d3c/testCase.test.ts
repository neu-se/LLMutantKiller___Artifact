import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot of i", () => {
  it("acot(i) should return Complex(0, Infinity)", () => {
    const result = new Complex(0, 1).acot();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});