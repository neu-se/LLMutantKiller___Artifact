import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should correctly compute csc(z) for a complex number with non-zero real and imaginary parts", () => {
    // csc(z) = 1/sin(z)
    // For z = 1 + i:
    // sin(1 + i) = sin(1)*cosh(1) + i*cos(1)*sinh(1)
    // The denominator in csc is: 0.5*cosh(2b) - 0.5*cos(2a)
    // where a=1, b=1
    // Original: 0.5*cosh(2) - 0.5*cos(2)
    // Mutated:  0.5*cosh(2) - 0.5/cos(2)
    // These give different values, so csc(1+i) will differ

    const z = new Complex(1, 1);
    const result = z.csc();

    // Expected: csc(1+i) = 1/sin(1+i)
    // sin(1+i) = sin(1)*cosh(1) + i*cos(1)*sinh(1)
    const sinRe = Math.sin(1) * Math.cosh(1);
    const sinIm = Math.cos(1) * Math.sinh(1);
    const denom = sinRe * sinRe + sinIm * sinIm;
    const expectedRe = sinRe / denom;
    const expectedIm = -sinIm / denom;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});