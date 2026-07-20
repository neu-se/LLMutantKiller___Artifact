describe("Complex cosh fallback behavior", () => {
  it("should correctly compute sin of complex number with imaginary part using cosh fallback", () => {
    const originalCosh = (Math as any).cosh;
    (Math as any).cosh = undefined;
    jest.resetModules();
    const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    (Math as any).cosh = originalCosh;

    // sin(1 + 1i) = sin(1)*cosh(1) + i*cos(1)*sinh(1)
    const z = new Complex(1, 1);
    const result = z.sin();
    expect(result.re).toBeCloseTo(Math.sin(1) * Math.cosh(1), 10);
    expect(result.im).toBeCloseTo(Math.cos(1) * Math.sinh(1), 10);
  });
});