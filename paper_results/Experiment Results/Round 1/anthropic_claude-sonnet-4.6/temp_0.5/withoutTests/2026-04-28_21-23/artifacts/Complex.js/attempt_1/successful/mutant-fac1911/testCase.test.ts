import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a complex number with non-zero real and imaginary parts", () => {
    // For acsch, the formula uses d = a * a + b * b
    // The mutation changes it to d = a / a + b * b = 1 + b * b
    // We need a case where a * a != 1, so a != 1 and a != -1
    // Let's use a = 2, b = 1
    // Original: d = 2*2 + 1*1 = 5
    // Mutated:  d = 2/2 + 1*1 = 1 + 1 = 2
    // This will produce different results for acsch(2 + i)
    
    const z = new Complex(2, 1);
    const result = z.acsch();
    
    // Compute expected value: acsch(2+i) = asinh(1/(2+i)) = asinh((2-i)/5)
    // 1/(2+i) = (2-i)/(4+1) = (2-i)/5 = 0.4 - 0.2i
    // asinh(0.4 - 0.2i)
    const expected = new Complex(0.4, -0.2).asinh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});