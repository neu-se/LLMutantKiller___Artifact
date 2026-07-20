import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function via expm1", () => {
  it("should compute expm1 accurately for small imaginary values, detecting sign mutation in Taylor series", () => {
    // cosm1(x) is used in expm1: expm1(0 + ix).re = cosm1(x) = cos(x) - 1
    // The mutation changes - 1/3628800 to + 1/3628800 in the Taylor series
    // Use b = pi/4 which is within the Taylor series range (|b| <= pi/4)
    const b = Math.PI / 4;
    
    const result = new Complex(0, b).expm1();
    
    // The real part should equal cos(b) - 1
    const expected = Math.cos(b) - 1;
    
    // The difference between original and mutated is 2 * (1/3628800) * b^8
    // For b = pi/4: 2 * (pi/4)^8 / 3628800 ≈ 7.9e-8, well above floating point noise
    expect(result.re).toBeCloseTo(expected, 10);
    
    // More precise check: the absolute difference should be very small
    const diff = Math.abs(result.re - expected);
    expect(diff).toBeLessThan(1e-10);
  });
});