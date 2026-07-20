import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a complex number with non-zero real and imaginary parts", () => {
    // acsch(2 + i) should use d = a*a + b*b = 4 + 1 = 5
    // In the mutated version, d = a/a + b*b = 1 + 1 = 2, giving wrong result
    const z = new Complex(2, 1);
    const result = z.acsch();
    
    // The correct value: acsch(2+i) = asinh(1/(2+i)) = asinh((2-i)/5) = asinh(0.4 - 0.2i)
    // Compute expected: asinh(0.4 - 0.2i)
    const expected = new Complex(0.4, -0.2).asinh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});