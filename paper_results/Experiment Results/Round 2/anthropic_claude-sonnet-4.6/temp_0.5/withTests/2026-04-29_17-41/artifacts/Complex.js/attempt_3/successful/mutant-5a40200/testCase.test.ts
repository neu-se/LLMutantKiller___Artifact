import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosh fallback function correctness", () => {
  it("should compute sin of complex number correctly, requiring correct cosh fallback for large values", () => {
    // Save original Math.cosh
    const originalCosh = Math.cosh;

    // Remove Math.cosh to force the fallback to be used when module is re-loaded
    // @ts-ignore
    delete Math.cosh;

    // Reset modules so complex.js re-evaluates `var cosh = Math.cosh || function(x) {...}`
    jest.resetModules();

    // Dynamically require the module after removing Math.cosh
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Complex2 = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // sin(a + bi) = sin(a)*cosh(b) + i*cos(a)*sinh(b)
    // For a=1, b=1: re = sin(1)*cosh(1)
    // Original fallback cosh(1): |1| < 1e-9 is false, so uses (exp(1)+exp(-1))/2 ≈ 1.5430806348152437
    // Mutated fallback cosh(1): |1| >= 1e-9 is true, so returns 1 - 1 = 0
    const result = new Complex2(1, 1).sin();

    const expectedRe = Math.sin(1) * originalCosh(1);
    const expectedIm = Math.cos(1) * Math.sinh(1);

    // Restore Math.cosh
    Math.cosh = originalCosh;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});