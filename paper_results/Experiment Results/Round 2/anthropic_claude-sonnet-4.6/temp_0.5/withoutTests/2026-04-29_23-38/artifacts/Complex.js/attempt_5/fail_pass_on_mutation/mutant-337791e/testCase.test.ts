import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp method", () => {
  it("should return undefined for exp when im is not zero in original but defined in mutant", () => {
    // In original: outer if(im===0) only executes return when im===0
    // In mutant: outer if(im!==0) only executes return when im!==0
    // Test with im===0: original returns Complex, mutant returns undefined
    const c = new Complex(3, 0);
    const result = c.exp();
    
    // Original: im===0 so enters if, returns Complex(e^3, 0)
    // Mutant: im===0 so skips if, returns undefined
    expect(result).toBeInstanceOf(Complex);
    expect(result.re).toBeCloseTo(Math.exp(3), 10);
  });
});