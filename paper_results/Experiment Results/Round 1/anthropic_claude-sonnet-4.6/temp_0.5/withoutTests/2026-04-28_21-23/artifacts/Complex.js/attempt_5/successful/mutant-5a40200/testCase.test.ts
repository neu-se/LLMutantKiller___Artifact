describe("cosh fallback behavior", () => {
  it("should compute cosh correctly for values >= 1e-9 using the fallback", () => {
    // Temporarily remove Math.cosh so the fallback is used
    const originalCosh = Math.cosh;
    // @ts-ignore
    delete Math.cosh;

    // Force module re-evaluation so the fallback is captured
    jest.resetModules();
    const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    Math.cosh = originalCosh;

    // sin(a + bi) = sin(a)*cosh(b) + i*cos(a)*sinh(b)
    // With a=0, b=2: re = sin(0)*cosh(2) = 0, im = cos(0)*sinh(2) = sinh(2)
    // Test cos(0 + 2i) = cos(0)*cosh(2) - i*sin(0)*sinh(2) = cosh(2)
    // Original fallback cosh(2): |2| >= 1e-9, returns (exp(2)+exp(-2))*0.5 ≈ 3.762
    // Mutated fallback cosh(2): |2| >= 1e-9, returns 1 - 2 = -1 (WRONG)
    const z = new Complex(0, 2);
    const result = z.cos();

    expect(result.re).toBeCloseTo(Math.cosh(2), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});