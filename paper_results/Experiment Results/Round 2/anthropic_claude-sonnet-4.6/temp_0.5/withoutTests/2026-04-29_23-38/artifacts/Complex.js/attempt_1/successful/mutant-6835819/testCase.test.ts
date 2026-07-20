import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero imaginary part", () => {
    // For atanh, the real part of the intermediate complex number is:
    // (onePlus * oneMinus - b * b) / d
    // where onePlus = 1 + a, oneMinus = 1 - a, d = oneMinus^2 + b^2
    // The mutation changes b * b to b / b (which equals 1 for b != 0)
    // So we need b != 0 and b^2 != 1 (i.e., b != 1 and b != -1) to detect the mutation
    
    // Let's use a = 0, b = 2
    // onePlus = 1, oneMinus = 1, d = 1 + 4 = 5
    // Original: (1 * 1 - 4) / 5 = -3/5 = -0.6
    // Mutated:  (1 * 1 - 1) / 5 = 0/5 = 0
    
    const z = new Complex(0, 2);
    const result = z.atanh();
    
    // atanh(2i) = i * atan(2) 
    // The real part should be 0, imaginary part should be atan(2) ≈ 1.1071487177940904
    // Let's verify with known value: atanh(2i) = i*atan(2)
    const expected = Math.atan(2);
    
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(expected, 10);
  });
});