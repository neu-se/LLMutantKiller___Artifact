describe("sinh fallback mutation detection", () => {
  it("detects * vs / 0.5 in sinh fallback", () => {
    const originalSinh = Math.sinh;
    // @ts-ignore
    Math.sinh = undefined;

    jest.resetModules();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    Math.sinh = originalSinh;

    // With fallback sinh: sinh(2) = (e^2 - e^-2) * 0.5 ≈ 3.6268604078470186
    // With mutated sinh:  sinh(2) = (e^2 - e^-2) / 0.5 ≈ 14.5074416...
    const c = new Complex(2, 0);
    const result = c.sinh();
    expect(result.re).toBeCloseTo(3.6268604078470186, 5);
    expect(result.re).not.toBeCloseTo(14.5074416, 2);
  });
});