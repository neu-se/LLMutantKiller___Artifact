import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch", () => {
  it("csch of a complex number should not return undefined", () => {
    // csch(c) = 2i / (e^(ci) - e^(-ci))
    // = sinh(a)*cos(b) - i*cosh(a)*sin(b)) / (sinh^2(a) + sin^2(b)) ... 
    // If original csch had implementation with var b = this['im'],
    // mutant changes to var b = this[""] = undefined breaking the result
    const c = new Complex(1, 1);
    const result = c.csch();
    
    // csch(1+i): should be a defined Complex number
    // sinh(a)*cos(b) component
    const a = 1, b = 1;
    const denom = Math.sinh(a) * Math.sinh(a) + Math.sin(b) * Math.sin(b);
    const expectedRe = Math.sinh(a) * Math.cos(b) / denom;
    const expectedIm = -Math.cosh(a) * Math.sin(b) / denom;
    
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});