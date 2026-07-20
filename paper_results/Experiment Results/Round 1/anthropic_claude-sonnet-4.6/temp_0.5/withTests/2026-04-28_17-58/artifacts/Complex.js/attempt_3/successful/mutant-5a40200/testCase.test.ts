import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosh fallback function", () => {
  it("should compute cos(i) correctly using the fallback cosh for values where |x| >= 1e-9", () => {
    // Save original Math.cosh
    const originalCosh = Math.cosh;

    // Remove Math.cosh to force the fallback implementation to be used
    // @ts-ignore
    delete Math.cosh;

    // Clear the require cache so the module re-evaluates with Math.cosh missing
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    delete require.cache[modulePath];

    // Re-require the module - now it will use the fallback cosh function
    const ComplexReloaded = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // Restore Math.cosh immediately
    Math.cosh = originalCosh;

    // Clean up cache again to avoid polluting other tests
    delete require.cache[modulePath];

    // cos(0 + 1i) = cos(0)*cosh(1) - i*sin(0)*sinh(1) = cosh(1) + 0i
    // cosh(1) = (e + 1/e)/2 ≈ 1.5430806348
    //
    // Original fallback: |x| < 1e-9 ? 1-x : (exp(x)+exp(-x))*0.5
    //   => for x=1: |1| < 1e-9 is FALSE, so uses (exp(1)+exp(-1))*0.5 ≈ 1.5430806348 (CORRECT)
    //
    // Mutated fallback: |x| >= 1e-9 ? 1-x : (exp(x)+exp(-x))*0.5
    //   => for x=1: |1| >= 1e-9 is TRUE, so uses 1-1 = 0 (WRONG)

    const z = new ComplexReloaded(0, 1);
    const result = z.cos();

    // cos(i) real part should be cosh(1) ≈ 1.5430806348
    expect(result.re).toBeCloseTo(1.5430806348152437, 5);
    expect(result.im).toBeCloseTo(0, 10);
  });
});