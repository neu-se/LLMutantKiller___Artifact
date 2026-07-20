import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch function", () => {
  it("should compute csch of a complex number with non-zero imaginary part correctly", () => {
    // Use z = 1 + i
    // csch(z) = 1/sinh(z)
    // sinh(1+i) = sinh(1)*cos(1) + i*cosh(1)*sin(1)
    const z = new Complex(1, 1);
    const result = z.csch();
    
    // Compute expected via 1/sinh(1+i)
    const sinhZ = z.sinh();
    const expected = new Complex(1, 0).div(sinhZ);
    
    expect(result.re).toBeCloseTo(expected.re, 8);
    expect(result.im).toBeCloseTo(expected.im, 8);
  });
});