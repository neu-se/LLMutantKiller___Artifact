import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow general case", () => {
  it("(2+i)^(1+i) should not be zero", () => {
    // This reaches the general pow computation path
    // a=2, b=1 (non-zero base), z.re=1, z.im=1 (complex exponent)
    // Original: if(a===0 && b===0) is false, computes correctly  
    // Mutated: if(true) returns Complex.ZERO
    const base = new Complex(2, 1);
    const exponent = new Complex(1, 1);
    const result = base.pow(exponent);
    
    expect(result.re).not.toBeCloseTo(0, 5);
  });
});