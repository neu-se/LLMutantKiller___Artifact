import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should correctly compute asinh of a complex number", () => {
    // asinh(1 + i) should return a specific complex number
    // The mutation changes res['re'] = -res['im'] to res['re'] = -res[""]
    // res[""] would be undefined, so -undefined = NaN
    // This means the real part of the result would be NaN in the mutated code
    const z = new Complex(1, 1);
    const result = z.asinh();
    
    // Known value: asinh(1+i) ≈ 1.0612750619050357 + 0.6662394324925153i
    expect(result.re).toBeCloseTo(1.0612750619050357, 10);
    expect(result.im).toBeCloseTo(0.6662394324925153, 10);
  });
});