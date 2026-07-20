import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh fallback behavior", () => {
  it("should correctly compute cos of purely imaginary number using correct cosh formula", () => {
    // The cosh fallback: original uses exp(-x), mutation uses exp(+x)
    // In Node.js Math.cosh exists so we need to verify via a different approach
    // We can monkey-patch Math.cosh to undefined before the module loads - but module is already loaded
    // Instead, verify the actual numeric result of cos(0 + 2i) matches expected
    // cos(0 + 2i) = cosh(2) ≈ 3.7621956910213407
    // mutated cosh(2) = exp(2) ≈ 7.38905609893065
    
    // Since Math.cosh exists natively, we need to temporarily remove it to test the fallback
    const originalCosh = Math.cosh;
    // @ts-ignore
    delete Math.cosh;
    
    // Re-require the module after removing Math.cosh
    jest.resetModules();
    const ComplexFresh = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    
    const c = new ComplexFresh(0, 2);
    const result = c.cos();
    
    Math.cosh = originalCosh;
    
    expect(result.re).toBeCloseTo(Math.cosh(2), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});