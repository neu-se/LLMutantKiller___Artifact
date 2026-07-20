import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh for a complex number with both real and imaginary parts", () => {
    // atanh(0.5 + 0.5i) should produce a specific complex number
    // The mutation changes x['re'] = logHypot(...) to x[""] = logHypot(...)
    // which means x['re'] would not be updated, leading to wrong result
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    
    // Expected values computed from the correct formula
    // atanh(0.5 + 0.5i) ≈ 0.4023594781... + 0.5535743588...i
    const expectedRe = 0.40235947810852507;
    const expectedIm = 0.5535743588970452;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});