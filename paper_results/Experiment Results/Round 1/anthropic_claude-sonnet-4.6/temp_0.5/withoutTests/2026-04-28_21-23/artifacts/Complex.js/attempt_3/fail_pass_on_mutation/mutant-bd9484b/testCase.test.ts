import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("acosh(0.5) should have a strictly positive imaginary part", () => {
    const c = new Complex(0.5, 0);
    const result = c.acosh();
    // For real x in (0,1), acosh(x) = i*acos(x)
    // acos(0.5).im === 0 exactly (logHypot(sqrt(0.75), 0.5) = log(1)/2 = 0)
    // Original (im <= 0): true branch -> result.im = acos(0.5).re > 0
    // Mutated (im < 0): false branch -> result.im = -acos(0.5).re < 0
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeGreaterThan(0);
    expect(result.im).toBeCloseTo(Math.PI / 2 - Math.atan2(0.5, Math.sqrt(0.75)), 10);
  });
});