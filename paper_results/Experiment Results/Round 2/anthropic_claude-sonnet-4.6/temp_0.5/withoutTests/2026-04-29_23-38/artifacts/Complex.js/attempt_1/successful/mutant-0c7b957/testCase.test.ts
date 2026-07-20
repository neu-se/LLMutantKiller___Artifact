import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh for a complex number with non-zero imaginary part", () => {
    // For atanh(a + bi), the denominator d = oneMinus^2 + b^2
    // where oneMinus = 1 - a
    // The mutation changes b*b to b/b (which equals 1 for b != 0)
    // This will produce wrong results when b != 1
    
    // Use z = 0 + 2i (a=0, b=2)
    // Original: d = (1-0)^2 + 2^2 = 1 + 4 = 5
    // Mutated:  d = (1-0)^2 + 2/2 = 1 + 1 = 2
    
    const z = new Complex(0, 2);
    const result = z.atanh();
    
    // atanh(2i) = i * atan(2) 
    // atanh(bi) = i * atan(b)
    // So atanh(2i) should have re=0 and im=atan(2)
    const expectedRe = 0;
    const expectedIm = Math.atan(2);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});