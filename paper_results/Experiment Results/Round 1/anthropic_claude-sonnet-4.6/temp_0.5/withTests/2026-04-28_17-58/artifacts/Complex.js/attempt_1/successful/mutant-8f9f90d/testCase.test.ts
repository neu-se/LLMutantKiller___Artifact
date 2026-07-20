import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh of a complex number with non-zero imaginary part", () => {
    // atanh(0.5 + 0.5i) should have a specific real part
    // The mutation changes x['re'] = logHypot(...) to x[''] = logHypot(...)
    // This means x['re'] won't be updated correctly, causing wrong result
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    
    // Expected: atanh(0.5 + 0.5i) ≈ 0.4023594781085251 + 0.5535743588970452i
    expect(result.re).toBeCloseTo(0.4023594781085251, 10);
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
  });
});