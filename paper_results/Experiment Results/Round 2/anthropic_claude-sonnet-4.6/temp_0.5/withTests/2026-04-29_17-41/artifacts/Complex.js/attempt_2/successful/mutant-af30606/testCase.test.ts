import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute sech for a complex number with non-zero real and imaginary parts", () => {
    // sech(a + bi) imaginary part = -2 * sinh(a) * sin(b) / d
    // where d = cos(2b) + cosh(2a)
    // Mutation changes to: -2 / sinh(a) * sin(b) / d
    // These differ when sinh(a) != 1, i.e., a != asinh(1) ≈ 0.881
    
    const a = 2;
    const b = 1;
    
    // Compute expected imaginary part using the correct formula
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    
    const result = new Complex(a, b).sech();
    
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});