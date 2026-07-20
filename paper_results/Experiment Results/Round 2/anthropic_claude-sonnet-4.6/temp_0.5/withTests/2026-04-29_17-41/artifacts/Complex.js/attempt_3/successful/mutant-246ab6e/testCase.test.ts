describe("cosh fallback mutation detection", () => {
  it("uses the correct cosh fallback formula (exp(x) + exp(-x)) * 0.5 not (exp(x) + exp(+x)) * 0.5", () => {
    // Temporarily remove Math.cosh to force the fallback to be used
    const originalCosh = Math.cosh;
    (Math as any).cosh = undefined;

    let Complex: any;
    jest.isolateModules(() => {
      Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    });

    // Restore Math.cosh
    Math.cosh = originalCosh;

    // sin(π/2 + bi).re = sin(π/2) * cosh(b) = cosh(b)
    // For b=2:
    // correct cosh(2) = (exp(2) + exp(-2)) / 2 ≈ 3.7621956910213407
    // mutated cosh(2) = (exp(2) + exp(2)) / 2 = exp(2) ≈ 7.38905609893065
    const b = 2;
    const c = new Complex(Math.PI / 2, b);
    const sinResult = c.sin();

    // re = cosh(b), should be correct cosh not mutated value
    const correctCosh = originalCosh(b);
    expect(sinResult.re).toBeCloseTo(correctCosh, 5);
  });
});