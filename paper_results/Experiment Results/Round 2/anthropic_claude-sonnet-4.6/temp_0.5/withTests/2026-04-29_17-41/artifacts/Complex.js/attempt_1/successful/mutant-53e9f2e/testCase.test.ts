import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh for a complex number where the mutation in d usage matters", () => {
    // For atanh, the code computes:
    // oneMinus = 1 - a
    // onePlus = 1 + a
    // d = oneMinus * oneMinus + b * b  (note: b/b = 1 when b != 0, so d = oneMinus^2 + 1)
    // re = (onePlus * oneMinus - b * b) / d  (original)
    // re = (onePlus * oneMinus - b * b) * d  (mutated)
    
    // Let's pick a = 0.5, b = 0.5
    // oneMinus = 0.5, onePlus = 1.5
    // d = 0.5*0.5 + 0.5/0.5 = 0.25 + 1 = 1.25
    // numerator_re = 1.5*0.5 - 0.5*0.5 = 0.75 - 0.25 = 0.5
    // original re = 0.5 / 1.25 = 0.4
    // mutated re = 0.5 * 1.25 = 0.625
    
    const z = new Complex(0.5, 0.5);
    const result = z.atanh();
    
    // Expected value computed from mathematical definition
    // atanh(0.5 + 0.5i) should have specific real and imaginary parts
    // Using the formula: atanh(z) = log((1+z)/(1-z)) / 2
    // (1 + 0.5 + 0.5i) = 1.5 + 0.5i
    // (1 - 0.5 - 0.5i) = 0.5 - 0.5i
    // (1.5 + 0.5i) / (0.5 - 0.5i) = (1.5 + 0.5i)(0.5 + 0.5i) / (0.5^2 + 0.5^2)
    //   = (0.75 + 0.75i + 0.25i + 0.25i^2) / 0.5
    //   = (0.75 - 0.25 + i(0.75 + 0.25)) / 0.5
    //   = (0.5 + i) / 0.5
    //   = 1 + 2i
    // log(1 + 2i) = log(sqrt(5)) + i*atan2(2,1)
    // atanh = (log(sqrt(5)) + i*atan2(2,1)) / 2
    // re = log(sqrt(5)) / 2 = ln(5)/4 ≈ 0.4023594781
    // im = atan2(2,1) / 2 ≈ 1.1071487177 / 2 ≈ 0.5535743589
    
    const expectedRe = Math.log(5) / 4;
    const expectedIm = Math.atan2(2, 1) / 2;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});