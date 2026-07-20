describe("Complex cosh fallback function", () => {
  it("should correctly compute cosh when Math.cosh is not available", () => {
    // Save and remove Math.cosh to force the fallback implementation
    const originalCosh = Math.cosh;
    (Math as any).cosh = undefined;

    // Re-require the module so it picks up the missing Math.cosh
    jest.resetModules();
    const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // Restore Math.cosh
    Math.cosh = originalCosh;

    // cosh(1) ≈ 1.5430806348152437
    // With original fallback: (exp(1) + exp(-1)) / 2 ≈ 1.5430806348152437
    // With mutated fallback: returns undefined
    const z = new Complex(1, 0);
    const result = z.cosh();

    expect(result.re).toBeCloseTo(1.5430806348152437, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});