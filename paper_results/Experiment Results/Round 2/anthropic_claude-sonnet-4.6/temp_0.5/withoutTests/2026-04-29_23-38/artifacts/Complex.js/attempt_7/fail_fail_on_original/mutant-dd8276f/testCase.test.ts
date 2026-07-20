import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc mutation detection", () => {
  it("acsc of subnormal complex number where d underflows to zero", () => {
    // With a=1e-200, b=1e-200, d = a*a + b*b underflows to 0
    // b=1e-200 !== 0, so original gives -Infinity, mutated gives 0
    const result = new Complex(1e-200, 1e-200).acsc();
    const resultOriginal = new Complex(0, -Infinity).asin();
    expect(result.re).toBeCloseTo(resultOriginal.re, 5);
    expect(result.im).toBeCloseTo(resultOriginal.im, 5);
  });
});