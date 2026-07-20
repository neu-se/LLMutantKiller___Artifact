import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh for real numbers greater than 1", () => {
  it("should return correct imaginary part for atanh of real number greater than 1", () => {
    // atanh(2) for real x > 1 should have imaginary part -π/2
    // Original: noIM = a > 1 && b === 0 = true, so im gets negated to -π/2
    // Mutated: noIM = false, so im stays at π/2
    const result = new Complex(2, 0).atanh();
    
    const expectedRe = Math.log(3) / 2; // ln(3)/2
    const expectedIm = -Math.PI / 2;    // -π/2
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});