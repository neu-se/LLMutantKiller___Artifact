import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should correctly compute acsc for a complex number with non-zero real and imaginary parts", () => {
    // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))
    // The mutation changes `var d = a * a + b * b` to `var d = a / a + b * b`
    // For a = 2, b = 1: original d = 4 + 1 = 5, mutated d = 1 + 1 = 2
    // This affects the computation significantly
    const c = new Complex(2, 1);
    const result = c.acsc();
    
    // Expected: acsc(2 + i) computed correctly
    // Using the formula: acsc(z) = asin(1/z)
    // 1/z = 1/(2+i) = (2-i)/5 = 0.4 - 0.2i
    // asin(0.4 - 0.2i) should give a specific value
    
    // The original code computes d = a*a + b*b = 4 + 1 = 5
    // Then uses (a/d, -b/d) = (2/5, -1/5) = (0.4, -0.2) as input to asin
    
    // The mutated code computes d = a/a + b*b = 1 + 1 = 2
    // Then uses (a/d, -b/d) = (2/2, -1/2) = (1, -0.5) as input to asin
    // This gives a completely different result
    
    // Compute expected value: asin(0.4 - 0.2i)
    const expected = new Complex(0.4, -0.2).asin();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});