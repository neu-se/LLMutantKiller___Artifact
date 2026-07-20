import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot of tiny complex (d underflows) should have NaN components", () => {
    const tiny = 1e-200;
    const result = new Complex(tiny, tiny).acot();
    // Both re and im should be NaN
    expect(result.re).toBeNaN();
    expect(result.im).toBeNaN();
  });
});