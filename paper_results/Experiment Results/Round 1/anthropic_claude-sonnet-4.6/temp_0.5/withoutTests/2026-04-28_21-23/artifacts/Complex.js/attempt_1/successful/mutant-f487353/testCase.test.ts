import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should return correct imaginary part for csc of a complex number with non-zero imaginary component", () => {
    // csc(c) = 2i / (e^(ci) - e^(-ci))
    // For c = 1 + i:
    // csc(1+i) imaginary part should be negative when sinh(b) > 0 and cos(a) > 0
    // The mutation changes -Math.cos(a) * sinh(b) / d to +Math.cos(a) * sinh(b) / d
    // which flips the sign of the imaginary part
    
    const z = new Complex(1, 1);
    const result = z.csc();
    
    // For a=1, b=1:
    // d = 0.5 * cosh(2) - 0.5 * cos(2)
    // cos(1) > 0, sinh(1) > 0, so -Math.cos(a) * sinh(b) / d should be negative
    // The mutant would make this positive
    
    // Verify the imaginary part is negative (original behavior)
    expect(result.im).toBeLessThan(0);
  });
});