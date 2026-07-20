import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh fallback", () => {
  it("should compute tanh correctly using cosh fallback when Math.cosh is unavailable", async () => {
    const originalCosh = Math.cosh;
    // @ts-ignore
    delete Math.cosh;

    jest.resetModules();
    const ComplexModule = await import("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    const C = ComplexModule.default || ComplexModule;

    const c = new C(2, 0);
    const result = c.tanh();

    Math.cosh = originalCosh;

    expect(result.re).toBeCloseTo(Math.tanh(2), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});