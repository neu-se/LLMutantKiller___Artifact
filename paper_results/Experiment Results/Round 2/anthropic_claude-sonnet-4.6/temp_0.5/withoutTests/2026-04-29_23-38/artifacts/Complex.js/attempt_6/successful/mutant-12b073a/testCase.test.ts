import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh local fallback", () => {
  it("detects mutation in sinh fallback by temporarily removing Math.sinh", () => {
    const originalSinh = Math.sinh;
    // @ts-ignore
    Math.sinh = undefined;
    
    // Re-require the module so the fallback function is used
    jest.resetModules();
    const ComplexFresh = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    
    const c = new ComplexFresh(2, 0);
    const result = c.sinh();
    
    // Restore Math.sinh
    Math.sinh = originalSinh;
    
    // Original: sinh(2) = (exp(2) - exp(-2)) * 0.5 ≈ 3.6268
    // Mutant:   sinh(2) = (exp(2) - exp(-2)) / 0.5 ≈ 14.507
    expect(result.re).toBeCloseTo(3.6268604078470186, 5);
    expect(result.im).toBeCloseTo(0, 10);
  });
});