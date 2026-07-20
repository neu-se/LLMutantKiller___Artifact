import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh behavior", () => {
  it("should correctly compute cosh of a complex number with large real part", () => {
    // The mutation changes Math.exp(-x) to Math.exp(+x) in the cosh fallback implementation
    // For large x (|x| >= 1e-9), cosh(x) = (exp(x) + exp(-x)) / 2
    // The mutated version computes (exp(x) + exp(x)) / 2 = exp(x), which is wrong
    // We test with a complex number where cosh is used internally
    
    // Use sin(0 + 2i) = sin(0)*cosh(2) + i*cos(0)*sinh(2)
    // = 0 * cosh(2) + i * 1 * sinh(2)
    // = i * sinh(2)
    // re should be 0, im should be sinh(2)
    
    // Use cos(0 + 2i) = cos(0)*cosh(2) - i*sin(0)*sinh(2)
    // = 1 * cosh(2) - 0
    // = cosh(2)
    // re should be cosh(2), im should be 0
    
    const c = new Complex(0, 2);
    const result = c.cos();
    
    const expectedCosh2 = Math.cosh(2); // approximately 3.7621956910213407
    
    // With the mutation: cosh(2) = (exp(2) + exp(2)) / 2 = exp(2) ≈ 7.389
    // Without mutation: cosh(2) = (exp(2) + exp(-2)) / 2 ≈ 3.762
    
    expect(result.re).toBeCloseTo(expectedCosh2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});