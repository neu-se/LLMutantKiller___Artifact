import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh fallback behavior", () => {
  it("should compute cos of purely imaginary number correctly using cosh", () => {
    // cos(0 + ib) = cos(0)*cosh(b) - i*sin(0)*sinh(b) = cosh(b)
    // For b = 5e-10 (< 1e-9):
    // If Math.cosh is overridden/absent, original fallback: cosh(5e-10) = 1 - 5e-10
    // Mutated fallback: cosh(5e-10) = (exp(5e-10) + exp(-5e-10))/2 ≈ 1 + 1.25e-19
    // We need to temporarily remove Math.cosh to force the fallback
    // Since we can't modify the module after import, we test with Math.cosh present
    // which means both original and mutated use Math.cosh - no difference
    
    // BUT: the module is evaluated at import time, capturing Math.cosh.
    // If we delete Math.cosh BEFORE importing, the fallback would be used.
    // Let's try that approach with jest.isolateModules
    
    let result: any;
    const originalCosh = Math.cosh;
    // @ts-ignore
    delete Math.cosh;
    
    jest.isolateModules(() => {
      const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
      // cos(0 + i*5e-10): real part = cosh(5e-10)
      // Original: 1 - 5e-10 = 0.9999999995
      // Mutated:  (exp(5e-10)+exp(-5e-10))/2 ≈ 1.000000000000000125
      result = new Complex(0, 5e-10).cos();
    });
    
    Math.cosh = originalCosh;
    
    // Original fallback returns 1 - 5e-10 which is < 1
    expect(result.re).toBeLessThan(1);
  });
});