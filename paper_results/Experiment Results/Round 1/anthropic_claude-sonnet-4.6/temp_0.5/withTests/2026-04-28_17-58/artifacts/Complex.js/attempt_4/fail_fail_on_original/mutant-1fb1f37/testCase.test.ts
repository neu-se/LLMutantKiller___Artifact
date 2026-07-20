import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosh small value branch", () => {
  it("should return value less than 1 for cosh of small positive number via tan denominator", () => {
    // tan(a + ib) = (sin(2a) + i*sinh(2b)) / (cos(2a) + cosh(2b))
    // For a=0, b=2.5e-10: tan(0 + i*2.5e-10)
    //   numerator re = sin(0) = 0
    //   numerator im = sinh(5e-10) ≈ 5e-10
    //   denominator = cos(0) + cosh(5e-10) = 1 + cosh(5e-10)
    // Original: cosh(5e-10) = 1 - 5e-10, so d = 2 - 5e-10
    // Mutated:  cosh(5e-10) ≈ 1 + 1.25e-19, so d ≈ 2 + 1.25e-19
    // tan im = sinh(5e-10) / d
    // Original: 5e-10 / (2 - 5e-10) > 5e-10 / 2
    // Mutated:  5e-10 / (2 + 1.25e-19) < 5e-10 / 2
    // The difference is tiny. Let's try a larger value just under 1e-9.
    // b = 4.99e-10, so 2b = 9.98e-10 < 1e-9
    // cosh(9.98e-10): original = 1 - 9.98e-10, mutated ≈ 1 + 4.99e-19
    // d_orig = 1 + (1 - 9.98e-10) = 2 - 9.98e-10
    // d_mut  = 1 + (1 + 4.99e-19) = 2 + 4.99e-19
    // sinh(9.98e-10) ≈ 9.98e-10
    // im_orig = 9.98e-10 / (2 - 9.98e-10) ≈ 9.98e-10/2 * (1 + 4.99e-10) 
    // im_mut  = 9.98e-10 / (2 + 4.99e-19) ≈ 9.98e-10/2
    // Difference ≈ 9.98e-10/2 * 4.99e-10 ≈ 2.49e-19 -- too small
    
    // Better approach: use cosh directly in sinh where im part = cosh(a)*sin(b)
    // sinh(a + ib) im = cosh(a) * sin(b)
    // For a = 5e-10, b = π/4:
    // Original: cosh(5e-10) = 1 - 5e-10, im = (1 - 5e-10) * sin(π/4)
    // Mutated:  cosh(5e-10) ≈ 1,          im ≈ sin(π/4)
    // Difference = 5e-10 * sin(π/4) ≈ 3.5e-10 -- detectable with enough precision
    const a = 5e-10;
    const b = Math.PI / 4;
    const result = new Complex(a, b).sinh();
    const sinB = Math.sin(b);
    // Original: im = (1 - 5e-10) * sin(π/4) = sin(π/4) - 5e-10 * sin(π/4)
    const expectedOriginal = (1 - a) * sinB;
    // Mutated: im ≈ sin(π/4) (slightly above)
    // Check that result matches original expectation
    expect(result.im).toBeCloseTo(expectedOriginal, 11);
  });
});