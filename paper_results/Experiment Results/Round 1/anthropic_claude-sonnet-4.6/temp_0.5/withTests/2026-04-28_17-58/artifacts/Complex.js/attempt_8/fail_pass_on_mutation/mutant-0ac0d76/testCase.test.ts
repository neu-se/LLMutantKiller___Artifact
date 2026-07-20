import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("pow of positive real with fractional exponent should match Math.pow", () => {
    // Original: a=2>0, b=0, z.im=0 → returns Math.pow(2, 0.5) exactly
    // Mutated: a=2, condition a<=0 is false, uses general formula which may differ slightly
    // For a=-2, b=0, z.re=2, z.im=0:
    // Original: a=-2, a>0 is false, goes to else if (a===0) - no, then general formula
    // Mutated: a=-2, a<=0 is true, returns Math.pow(-2, 2) = 4 (real)
    // But general formula for (-2)^2: exp(2*log(2) - 0) * cos(0 + 2*pi) = 4*cos(2pi) = 4 ✓
    
    // Key test: pow(2, 3) 
    // Original: returns Math.pow(2,3) = 8 exactly
    // Mutated: uses general exp/log formula, result should still be ~8 but via different path
    // These give same numerical result...
    
    // What about pow(-1, 0.5)?
    // Original: a=-1, a>0 false, a===0 false, general formula: arg=pi, loh=0, result=cos(pi/2)+i*sin(pi/2) = i
    // Mutated: a=-1, a<=0 TRUE, returns Math.pow(-1, 0.5) = NaN!
    const result = new Complex(-1, 0).pow(0.5);
    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});