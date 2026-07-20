import { createRequire } from "module";

describe("cosh fallback function", () => {
  it("should compute cosh correctly for values where |x| >= 1e-9 using the fallback", () => {
    // Save original Math.cosh
    const originalCosh = Math.cosh;

    // Remove Math.cosh to force the fallback implementation to be used
    // @ts-ignore
    delete Math.cosh;

    // Clear the require cache so the module re-evaluates with Math.cosh missing
    const require = createRequire(import.meta.url);
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    delete require.cache[modulePath];

    // Re-require the module - now it will use the fallback cosh function
    const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // Restore Math.cosh immediately
    Math.cosh = originalCosh;

    // Clean up cache again to avoid polluting other tests
    delete require.cache[modulePath];

    // cos(0 + bi) = cos(0)*cosh(b) - i*sin(0)*sinh(b) = cosh(b)
    // For z = 0 + 1i: real part = cosh(1) ≈ 1.5430806348
    // With the mutation, for |x| = 1 >= 1e-9: cosh(1) = 1 - 1 = 0 (WRONG)
    // With the original, for |x| = 1 >= 1e-9 is FALSE (wait, 1 >= 1e-9 is TRUE in original too)
    // Original: |x| < 1e-9 ? 1-x : (exp+exp)/2  => for x=1: uses (exp+exp)/2 = correct
    // Mutated:  |x| >= 1e-9 ? 1-x : (exp+exp)/2 => for x=1: uses 1-1 = 0 (wrong)

    const z = new Complex(0, 1);
    const result = z.cos();

    // cos(i) = cosh(1) ≈ 1.5430806348
    expect(result.re).toBeCloseTo(Math.cosh(1), 5);
    expect(result.im).toBeCloseTo(0, 10);
  });
});