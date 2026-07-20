import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh of a complex number with non-zero imaginary part", () => {
    // atanh(0.5 + 0.5i) should produce a specific complex result
    // The mutation changes x['re'] = logHypot(...) to x[""] = logHypot(...)
    // This means x['re'] won't be updated, causing wrong real part in result
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    
    // Expected values computed from the correct formula:
    // atanh(0.5 + 0.5i) ≈ 0.4023594781085251 + 0.5535743588970452i
    const expectedRe = 0.4023594781085251;
    const expectedIm = 0.5535743588970452;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});