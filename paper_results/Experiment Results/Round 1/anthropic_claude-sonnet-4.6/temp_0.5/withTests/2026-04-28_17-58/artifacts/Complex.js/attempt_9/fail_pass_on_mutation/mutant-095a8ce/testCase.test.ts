import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc(0) imaginary part should differ from asin(0) imaginary part", () => {
    const acscResult = new Complex(0, 0).acsc();
    const asinResult = new Complex(0, 0).asin();
    // Original acsc(0) = PI/2 + Inf*i
    // asin(0) = 0
    expect(acscResult.im).not.toBe(asinResult.im);
  });
});