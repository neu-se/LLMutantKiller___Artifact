import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should correctly compute asech(2) returning a real number close to 0", () => {
    // asech(2) = acosh(1/2) = log(1/2 + sqrt(1/4 - 1)) which involves imaginary part
    // For real input 0.5: asech(0.5) = log(2 + sqrt(3)) ≈ 1.3169578969248166
    // In original: d = 0.25 + 0 = 0.25, result is new Complex(0.5/0.25, 0).acosh() = new Complex(2, 0).acosh()
    // In mutant: d = NaN, result is new Complex(NaN, NaN).acosh() which is NaN
    const c = new Complex(0.5, 0);
    const result = c.asech();
    
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});