import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hyperbolic cosine fallback", () => {
  it("should compute sin of complex number correctly using cosh internally", () => {
    // If Math.cosh is NOT available (undefined), the fallback is used.
    // We can temporarily remove Math.cosh to force the fallback path.
    const originalCosh = Math.cosh;
    // @ts-ignore
    delete Math.cosh;
    
    // Re-require the module so it picks up the missing Math.cosh
    jest.resetModules();
    const ComplexFresh = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    
    // sin(0 + 2i) = sin(0)*cosh(2) + i*cos(0)*sinh(2) = 0 + i*sinh(2)
    // cos(0 + 2i) = cos(0)*cosh(2) - i*sin(0)*sinh(2) = cosh(2)
    // Original fallback for x=2: |2| < 1e-9 is false → (e^2 + e^-2)/2 ≈ 3.7622
    // Mutated fallback for x=2: |2| >= 1e-9 is true → 1 - 2 = -1
    const z = new ComplexFresh(0, 2);
    const result = z.cos();
    
    Math.cosh = originalCosh;
    
    const expected = Math.cosh(2); // ≈ 3.7622
    expect(result.re).toBeCloseTo(expected, 5);
  });
});