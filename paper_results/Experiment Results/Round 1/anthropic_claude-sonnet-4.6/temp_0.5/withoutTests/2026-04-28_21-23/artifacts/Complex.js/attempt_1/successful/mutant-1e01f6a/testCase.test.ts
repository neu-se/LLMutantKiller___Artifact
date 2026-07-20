import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should compute atanh of a real number greater than 1 with correct imaginary sign", () => {
    // atanh(2) for real x > 1 should have imaginary part of -π/2
    // The original code sets noIM = true when a > 1 && b === 0, which negates the imaginary part
    // The mutated code sets noIM = false, so the imaginary part won't be negated
    const result = new Complex(2, 0).atanh();
    
    // atanh(2) = 0.5493061443340548 - i * π/2
    // Real part: ln(3)/2 ≈ 0.5493061443340548
    // Imaginary part: -π/2 ≈ -1.5707963267948966
    expect(result.re).toBeCloseTo(Math.log(3) / 2, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});