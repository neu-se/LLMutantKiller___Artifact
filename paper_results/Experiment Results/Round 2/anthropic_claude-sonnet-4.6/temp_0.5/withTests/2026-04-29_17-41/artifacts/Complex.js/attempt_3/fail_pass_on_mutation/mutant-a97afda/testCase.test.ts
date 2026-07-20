import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("should compute atan(1 + 2i) correctly without triggering the b=1 special case", () => {
    // For z = 1 + 2i, b = 2, so if(b===1) is false in original
    // With mutation if(true), the b===1 special case always runs
    // The b===1 special case likely returns Infinity when a=0, or a specific value
    // For a=1, b=2: normal atan should give a finite complex number
    const result = new Complex(1, 2).atan();
    // atan(1+2i) should be finite
    expect(result.isFinite()).toBe(true);
    // The imaginary part should NOT be the b=1 special case result
    // atan(1+2i) re ≈ 1.3389725222944935, im ≈ 0.4023594781085251
    expect(result.re).toBeCloseTo(1.3389725222944935, 5);
    expect(result.im).toBeCloseTo(0.4023594781085251, 5);
  });
});