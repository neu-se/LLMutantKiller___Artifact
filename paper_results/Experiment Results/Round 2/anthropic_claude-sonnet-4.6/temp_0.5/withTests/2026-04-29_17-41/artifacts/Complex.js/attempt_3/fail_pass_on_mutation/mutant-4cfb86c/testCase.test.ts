import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot of complex number 1+i has correct imaginary part", () => {
    // acot(1+i) = atan(1/(1+i)) = atan((1-i)/2)
    // 1/(1+i) = (1-i)/2 = 0.5 - 0.5i
    // So acot(1+i) should equal atan(0.5 - 0.5i)
    const result = new Complex(1, 1).acot();
    const atanResult = new Complex(0.5, -0.5).atan();
    expect(result.re).toBeCloseTo(atanResult.re, 10);
    expect(result.im).toBeCloseTo(atanResult.im, 10);
  });
});