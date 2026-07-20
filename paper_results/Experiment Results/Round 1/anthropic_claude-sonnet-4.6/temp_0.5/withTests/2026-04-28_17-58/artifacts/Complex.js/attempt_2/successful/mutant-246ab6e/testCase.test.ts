import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosh fallback used in complex sin computation", () => {
  it("detects wrong cosh fallback by temporarily removing Math.cosh before module evaluation", () => {
    // The cosh variable is captured at module load time.
    // We need to delete Math.cosh before the module loads.
    // Since the module is already loaded, we must use jest.resetModules and re-require.
    
    const originalCosh = Math.cosh;
    // @ts-ignore
    delete Math.cosh;
    
    jest.resetModules();
    
    // Re-require the module without Math.cosh so the fallback is used
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ComplexReloaded = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    
    // Restore Math.cosh
    Math.cosh = originalCosh;
    
    // sin(1 + 1i) = sin(1)*cosh(1) + i*cos(1)*sinh(1)
    // correct cosh(1) = (e + 1/e)/2 ≈ 1.5430806348
    // mutated cosh(1) = e ≈ 2.71828...
    const z = new ComplexReloaded(1, 1);
    const result = z.sin();
    
    const expectedRe = Math.sin(1) * originalCosh(1);
    const expectedIm = Math.cos(1) * Math.sinh(1);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});