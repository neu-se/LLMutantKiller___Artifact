import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log function", () => {
  it("should return correct result for log of complex number with positive real part and zero imaginary part", () => {
    // Both original and mutated always fall through to logHypot formula
    // but the if-condition structure might affect parsing/execution differently
    // Test that log(e) = 1 + 0i
    const result = new Complex(Math.E, 0).log();
    
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
    
    // Also verify log(1) = 0
    const result2 = new Complex(1, 0).log();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(0, 10);
    
    // For a=1, b=0: original condition (b===0 && a>0) is true, mutated (b===0 && a<=0) is false
    // But since if-body is empty, behavior should be same... 
    // Unless logHypot(1, 0) differs from Math.log(1)?
    // logHypot(1, 0): b===0 so returns Math.log(Math.abs(1)) = 0. Same result.
    
    // Try with a value where logHypot might differ
    const result3 = new Complex(0, 1).log();
    expect(result3.re).toBeCloseTo(0, 10);
    expect(result3.im).toBeCloseTo(Math.PI / 2, 10);
  });
});