import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch method", () => {
  it("should correctly compute acsch for a complex number with non-zero imaginary part", () => {
    // For z = 1 + i, acsch(z) should give a specific result
    // The mutation changes d = a*a + b*b to d = a*a - b*b
    // For a=1, b=1: original d = 1+1 = 2, mutated d = 1-1 = 0
    // When d=0, it takes a different code path (the else branch)
    // So we pick a value where d != 0 in both cases but gives different results
    
    // Use a=2, b=1: original d = 4+1 = 5, mutated d = 4-1 = 3
    // This will produce different intermediate values and thus different results
    const z = new Complex(2, 1);
    const result = z.acsch();
    
    // Compute expected value: acsch(2+i) = asinh(1/(2+i)) = asinh((2-i)/5)
    // = asinh(0.4 - 0.2i)
    const expected = new Complex(2 / 5, -1 / 5).asinh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});