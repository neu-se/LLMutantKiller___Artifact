import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should return correct imaginary part for atanh when real part > 1 and imaginary part is 0", () => {
    // When a > 1 and b === 0, noIM is true
    // In the original code: if (noIM) { x['im'] = -x['im']; }
    // In the mutated code: if (true) { x['im'] = -x['im']; }
    // For a value where noIM is false (a <= 1 or b !== 0), the mutation causes x['im'] to be negated incorrectly
    
    // Test with a complex number where noIM is false (b !== 0)
    // atanh(0.5 + 0.5i) should have a specific imaginary part
    const z = new Complex(0.5, 0.5);
    const result = z.atanh();
    
    // The expected value of atanh(0.5 + 0.5i)
    // atanh(0.5 + 0.5i) ≈ 0.4023594781085251 + 0.5535743588970452i
    const expectedRe = 0.4023594781085251;
    const expectedIm = 0.5535743588970452;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    // In the original code, noIM is false (b !== 0), so x['im'] is NOT negated
    // In the mutated code, if (true) always negates x['im'], so the imaginary part would be wrong
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});