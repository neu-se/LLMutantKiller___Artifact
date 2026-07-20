import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should correctly compute csc(z) for z = 2 + i using the correct denominator formula", () => {
    // csc(z) = 1/sin(z)
    // sin(2 + i) = sin(2)*cosh(1) + i*cos(2)*sinh(1)
    const a = 2;
    const b = 1;

    const sinRe = Math.sin(a) * Math.cosh(b);
    const sinIm = Math.cos(a) * Math.sinh(b);
    const sinAbsSq = sinRe * sinRe + sinIm * sinIm;
    const expectedRe = sinRe / sinAbsSq;
    const expectedIm = -sinIm / sinAbsSq;

    const result = new Complex(a, b).csc();

    // The mutation changes cos(2*a) to cos(2/a), i.e., cos(4) vs cos(1)
    // This produces a different denominator and thus different re/im values
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});