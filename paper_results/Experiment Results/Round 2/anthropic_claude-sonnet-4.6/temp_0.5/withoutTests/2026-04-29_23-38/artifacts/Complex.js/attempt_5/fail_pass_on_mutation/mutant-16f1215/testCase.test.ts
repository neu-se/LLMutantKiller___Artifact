import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc of a normal complex number should produce correct result", () => {
    // acsc(2) = asin(1/2) = PI/6
    const result = new Complex(2, 0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 6, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});