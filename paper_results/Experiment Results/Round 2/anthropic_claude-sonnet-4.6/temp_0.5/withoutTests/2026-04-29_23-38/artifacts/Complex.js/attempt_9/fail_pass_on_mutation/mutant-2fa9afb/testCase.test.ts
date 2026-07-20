import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should compute (2+3i)^(1+0i) correctly", () => {
    // (2+3i)^1 = 2+3i
    // Original: a=2, b=3, condition (a===0 && b===0) is false, computes normally
    // Mutated: if(true) returns ZERO immediately before any computation
    // But wait - there are early returns before this condition for isZero exponent
    // z=[1,0] is not zero, z.im===0 so enters "exponent is real" branch
    // b!==0 so doesn't enter "base is fully imaginary" branch  
    // Then reaches: if (a===0 && b===0 ...) - a=2, b=3 so original skips
    // Mutated: returns ZERO
    const c = new Complex(2, 3);
    const result = c.pow(new Complex(1, 0));
    
    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBeCloseTo(3, 10);
  });
});