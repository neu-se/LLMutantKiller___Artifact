import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh of a complex number with non-zero imaginary part", () => {
    // atanh(0.5 + 0.5i) should produce a specific complex result
    // The mutation changes x['re'] = logHypot(...) to x[""] = logHypot(...)
    // This means the real part of the intermediate result won't be updated,
    // causing incorrect output for atanh
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    
    // Expected values for atanh(0.5 + 0.5i)
    // atanh(z) = log((1+z)/(1-z)) / 2
    // These are the correct values
    const expectedRe = 0.4023594781085251;
    const expectedIm = 0.5535743588970452;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});