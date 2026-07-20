import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should correctly compute asinh of a complex number", () => {
    // asinh(1 + i) should have a well-defined real and imaginary part
    // The mutation changes res['re'] = -res['im'] to res['re'] = -res[""]
    // res[""] is undefined, so -res[""] is NaN in the mutated code
    const c = new Complex(1, 1);
    const result = c.asinh();
    
    // Known value: asinh(1+i) ≈ 1.0612750619050357 + 0.6662394324925153i
    expect(result.re).toBeCloseTo(1.0612750619050357, 10);
    expect(result.im).toBeCloseTo(0.6662394324925153, 10);
  });
});