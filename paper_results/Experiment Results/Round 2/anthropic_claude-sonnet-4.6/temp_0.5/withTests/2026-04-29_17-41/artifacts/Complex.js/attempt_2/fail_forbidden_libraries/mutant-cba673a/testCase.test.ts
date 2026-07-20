import { jest } from "@jest/globals";

describe("Complex cosh fallback", () => {
  it("should correctly compute sin of purely imaginary number using cosh fallback when Math.cosh is unavailable", () => {
    const originalCosh = (Math as any).cosh;
    (Math as any).cosh = undefined;
    jest.resetModules();
    const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    (Math as any).cosh = originalCosh;
    // sin(0 + 1i) = sin(0)*cosh(1) + i*cos(0)*sinh(1) = 0 + i*sinh(1)
    // re part = sin(0)*cosh(1) = 0 (regardless of cosh)
    // For a better test: sin(1 + 1i) = sin(1)*cosh(1) + i*cos(1)*sinh(1)
    const z = new Complex(1, 1);
    const result = z.sin();
    expect(result.re).toBeCloseTo(Math.sin(1) * Math.cosh(1), 10);
    expect(result.im).toBeCloseTo(Math.cos(1) * Math.sinh(1), 10);
  });
});