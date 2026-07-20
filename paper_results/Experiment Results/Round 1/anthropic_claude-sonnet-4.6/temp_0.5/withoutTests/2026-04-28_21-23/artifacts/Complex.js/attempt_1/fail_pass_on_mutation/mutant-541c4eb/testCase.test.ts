import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should correctly compute the inverse hyperbolic sine of a complex number", () => {
    // asinh(1 + i) should return a specific complex number
    // The mutation changes this['re'] = -this['im'] to this['re'] = -this[""]
    // this[""] is undefined, so -undefined = NaN
    // This will cause the result to have NaN for re component
    const c = new Complex(1, 1);
    const result = c.asinh();
    
    // Expected value of asinh(1 + i):
    // approximately 1.0612750619050357 + 0.6662394324925153i
    expect(result.re).toBeCloseTo(1.0612750619050357, 10);
    expect(result.im).toBeCloseTo(0.6662394324925153, 10);
  });
});