import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero imaginary part", () => {
    // For atanh, the real part of the intermediate complex number is:
    // (onePlus * oneMinus - b * b) / d
    // where onePlus = 1 + a, oneMinus = 1 - a, d = oneMinus^2 + b^2
    // The mutation changes b * b to b / b (which equals 1 for b != 0)
    // We need b != 0 and b * b != b / b, so b != 1 and b != -1
    // Let's use a = 0, b = 2
    // Original: onePlus = 1, oneMinus = 1, d = 1 + 4 = 5
    //   re = (1 * 1 - 4) / 5 = -3/5 = -0.6
    // Mutated: re = (1 * 1 - 1) / 5 = 0/5 = 0
    
    const result = new Complex(0, 2).atanh();
    
    // The expected result of atanh(2i):
    // atanh(2i) = i * atan(2) ≈ 0 + 1.1071487177940904i
    // But let's verify via the formula directly
    // atanh(z) = log((1+z)/(1-z)) / 2
    // (1+2i)/(1-2i) = (1+2i)^2 / ((1-2i)(1+2i)) = (1+4i-4)/(1+4) = (-3+4i)/5
    // log((-3+4i)/5) = log(-0.6 + 0.8i)
    // abs = sqrt(0.36 + 0.64) = 1, arg = atan2(0.8, -0.6)
    // So log = 0 + i*atan2(0.8, -0.6)
    // atanh = 0 + i*atan2(0.8, -0.6)/2
    
    const expectedRe = 0;
    const expectedIm = Math.atan2(0.8, -0.6) / 2;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});