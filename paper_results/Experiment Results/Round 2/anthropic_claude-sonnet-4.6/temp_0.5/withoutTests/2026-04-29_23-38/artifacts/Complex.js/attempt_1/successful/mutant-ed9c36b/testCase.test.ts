import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sec function", () => {
  it("should correctly compute the secant of a complex number with non-zero imaginary part", () => {
    // sec(a + bi) = cos(a)*cosh(b) / d + i * sin(a)*sinh(b) / d
    // where d = 0.5 * cosh(2*b) + 0.5 * cos(2*a)
    // The mutation changes 2*b to 2/b in the cosh term, which gives wrong results

    const a = 1;
    const b = 2;
    const z = new Complex(a, b);
    const result = z.sec();

    // Compute expected values manually
    // d = 0.5 * cosh(2*2) + 0.5 * cos(2*1) = 0.5 * cosh(4) + 0.5 * cos(2)
    const cosh2b = Math.cosh(2 * b);
    const cos2a = Math.cos(2 * a);
    const d = 0.5 * cosh2b + 0.5 * cos2a;

    const coshB = Math.cosh(b);
    const sinhB = Math.sinh(b);
    const cosA = Math.cos(a);
    const sinA = Math.sin(a);

    const expectedRe = cosA * coshB / d;
    const expectedIm = sinA * sinhB / d;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});