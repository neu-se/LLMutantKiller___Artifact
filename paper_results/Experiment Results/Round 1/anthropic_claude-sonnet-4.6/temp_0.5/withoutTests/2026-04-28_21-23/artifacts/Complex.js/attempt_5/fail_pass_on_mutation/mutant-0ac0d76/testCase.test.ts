import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow function", () => {
  it("should correctly compute pow for negative real base with integer exponent", () => {
    // (-2)^3 should equal -8
    // Original: b===0, a=-2, a>0 is false, so falls to general formula -> correct result
    // Mutated: b===0, a=-2, a<=0 is true, so returns Math.pow(-2, 3) = -8 ... same?
    
    // Try (-1)^2 = 1
    // Original: a<=0 is false (a>0 check), falls to general formula
    // Mutated: a<=0 is true, returns Math.pow(-1, 2) = 1
    
    // For positive base: 2^3 = 8
    // Original: a>0 true, returns Math.pow(2,3)=8
    // Mutated: a<=0 false, falls to general formula using logHypot
    const result = new Complex(2, 0).pow(new Complex(3, 0));
    expect(result.re).toBeCloseTo(8, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});