import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh with real number greater than 1", () => {
  it("should negate the imaginary part when input is real and greater than 1", () => {
    // When a > 1 and b === 0, noIM is true, and the original code negates x['im']
    // The mutation removes this negation, so x['im'] remains unnegated
    const c = new Complex(2, 0);
    const result = c.atanh();
    
    // atanh(2) = 0.5 * log((1+2)/(1-2)) = 0.5 * log(-3)
    // For real x > 1: atanh(x) = 0.5 * ln((x+1)/(x-1)) + i*pi/2
    // The imaginary part should be -pi/2 (negative) due to the negation in original code
    // In the mutated code, the negation is skipped, so im would be pi/2 (positive)
    
    // The real part of atanh(2) should be approximately 0.5493...
    expect(result.re).toBeCloseTo(0.5493061443340549, 10);
    
    // The imaginary part should be -pi/2 in the original code
    // In the mutated code it would be +pi/2
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});