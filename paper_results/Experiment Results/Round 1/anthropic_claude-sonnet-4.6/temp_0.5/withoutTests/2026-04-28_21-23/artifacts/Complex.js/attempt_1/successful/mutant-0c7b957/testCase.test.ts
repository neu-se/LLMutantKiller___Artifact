import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh for a complex number with non-zero imaginary part", () => {
    // For atanh(a + bi), the formula uses d = oneMinus * oneMinus + b * b
    // where oneMinus = 1 - a
    // The mutation changes b * b to b / b (which equals 1 for non-zero b)
    // This will produce wrong results when b != 1 and b != -1
    
    // Use z = 0 + 2i (a=0, b=2)
    // Original: d = (1-0)^2 + 2^2 = 1 + 4 = 5
    // Mutated:  d = (1-0)^2 + 2/2 = 1 + 1 = 2
    
    const z = new Complex(0, 2);
    const result = z.atanh();
    
    // Known value: atanh(2i) = i * atan(2)
    // atanh(bi) = i * atan(b)
    // So atanh(2i) should have re=0, im=atan(2) ≈ 1.1071487177940904
    
    const expectedIm = Math.atan(2); // ≈ 1.1071487177940904
    
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});