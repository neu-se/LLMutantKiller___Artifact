import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should correctly compute asec for a complex number with non-zero imaginary part", () => {
    // For asec, the key computation is d = a*a + b*b (sum of squares)
    // The mutation changes it to d = a*a - b*b (difference of squares)
    // We need a case where a*a + b*b != a*a - b*b, i.e., b != 0
    
    // Use z = 1 + i (a=1, b=1)
    // Original: d = 1*1 + 1*1 = 2
    // Mutated:  d = 1*1 - 1*1 = 0 (which triggers the else branch returning acos of infinity)
    
    const z = new Complex(1, 1);
    const result = z.asec();
    
    // The expected result for asec(1+i):
    // asec(z) = acos(1/z) = acos(1/(1+i)) = acos((1-i)/2)
    // 1/(1+i) = (1-i)/((1+i)(1-i)) = (1-i)/2 = 0.5 - 0.5i
    // acos(0.5 - 0.5i)
    
    // Compute expected value using the original formula:
    // d = 1 + 1 = 2
    // new Complex(a/d, -b/d) = new Complex(0.5, -0.5)
    // then .acos()
    const expected = new Complex(0.5, -0.5).acos();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
    
    // Also verify the result is not NaN or Infinity (which would happen with mutated code)
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});