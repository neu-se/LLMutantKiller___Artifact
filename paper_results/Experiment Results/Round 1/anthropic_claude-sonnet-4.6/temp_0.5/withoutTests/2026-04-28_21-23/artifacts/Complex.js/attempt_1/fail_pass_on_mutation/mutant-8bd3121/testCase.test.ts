import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech function", () => {
  it("should correctly compute asech of a real number", () => {
    // asech(0.5) should return a valid complex number
    // In the mutated code, `b = this[""]` will be undefined instead of this['im']
    // This will cause the computation to use undefined instead of the imaginary part
    const c = new Complex(0.5, 0);
    const result = c.asech();
    
    // asech(0.5) = acosh(1/0.5) = acosh(2) = log(2 + sqrt(3)) ≈ 1.3169578969248166
    const expected = Math.log(2 + Math.sqrt(3));
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});