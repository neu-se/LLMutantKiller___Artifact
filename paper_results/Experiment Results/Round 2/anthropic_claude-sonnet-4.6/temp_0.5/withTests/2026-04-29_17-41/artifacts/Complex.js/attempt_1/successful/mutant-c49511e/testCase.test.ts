import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should correctly compute the cosecant of a complex number", () => {
    // csc(z) = 1/sin(z)
    // For z = 1 + 1i, csc should return a specific complex value
    // The mutation changes `var a = this['re']` to `var b = this[""]` which means
    // `a` is never defined in csc, so it uses undefined, breaking the calculation
    
    const z = new Complex(1, 1);
    const result = z.csc();
    
    // Expected: csc(1 + i) = sin(1)*cosh(1) - i*cos(1)*sinh(1) / (sin^2(1)*cosh^2(1) + cos^2(1)*sinh^2(1))
    // Let's compute manually:
    // sin(1+i) = sin(1)cosh(1) + i*cos(1)*sinh(1)
    // |sin(1+i)|^2 = sin^2(1)*cosh^2(1) + cos^2(1)*sinh^2(1)
    // csc(1+i) = conj(sin(1+i)) / |sin(1+i)|^2
    
    const a = 1;
    const b = 1;
    const d = 0.5 * Math.cosh(2 * b) - 0.5 * Math.cos(2 * a);
    const expectedRe = Math.sin(a) * Math.cosh(b) / d;
    const expectedIm = -Math.cos(a) * Math.sinh(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});