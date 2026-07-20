import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the real part of sech for a complex number", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // For z = 1 + 1i:
    // a = 1, b = 1
    // d = cos(2*1) - cosh(2*1)
    // real part = 2 * cosh(a) * cos(b) / d  (original)
    // mutant:    = 2 * cosh(a) / cos(b) / d  (wrong)
    // These differ when cos(b) != 1, i.e., when b != 0

    const z = new Complex(1, 1);
    const result = z.sech();

    // Compute expected value manually:
    // sech(1+i) = 2 / (e^(1+i) + e^(-1-i))
    // = 2 / (e*(cos1 + i*sin1) + e^-1*(cos(-1) + i*sin(-1)))
    // = 2 / ((e+e^-1)*cos1 + i*(e-e^-1)*sin1)
    const a = 1;
    const b = 1;
    const coshA = Math.cosh(a);
    const sinhA = Math.sinh(a);
    const cosB = Math.cos(b);
    const sinB = Math.sin(b);
    const d = cosB - Math.cosh(2 * a); // cos(2b) - cosh(2a) with b=1: cos(2) - cosh(2)
    // Wait, let me recalculate d properly:
    // d = Math.cos(2 * b) - cosh(2 * a)
    const dVal = Math.cos(2 * b) - Math.cosh(2 * a);
    
    const expectedRe = 2 * Math.cosh(a) * Math.cos(b) / dVal;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / dVal;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});