import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("expm1 with small imaginary part uses cosm1 correctly", () => {
  it("should compute expm1 for a purely imaginary number with correct cosm1 Taylor series", () => {
    // For Complex(0, b).expm1():
    // re = Math.expm1(0) * Math.cos(b) + cosm1(b) = 0 + cosm1(b) = cos(b) - 1
    // im = Math.exp(0) * Math.sin(b) = sin(b)
    // Using b = 0.1 (small, within ±π/4), cosm1 uses Taylor series
    // cos(0.1) - 1 ≈ -0.004995834721974977
    const b = 0.1;
    const result = new Complex(0, b).expm1();
    const expectedRe = Math.cos(b) - 1;
    const expectedIm = Math.sin(b);
    
    expect(result.re).toBeCloseTo(expectedRe, 12);
    expect(result.im).toBeCloseTo(expectedIm, 12);
  });
});