import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute sech(1 + i) matching the known mathematical result", () => {
    // sech(z) = 1 / cosh(z)
    // We can compute the expected result via: 1 / cosh(1 + i)
    // cosh(1 + i) = cosh(1)*cos(1) + i*sinh(1)*sin(1)
    const a = 1;
    const b = 1;
    
    const coshA = Math.cosh(a);
    const sinhA = Math.sinh(a);
    const cosB = Math.cos(b);
    const sinB = Math.sin(b);
    
    // cosh(1+i) = cosh(1)*cos(1) + i*sinh(1)*sin(1)
    const coshRe = coshA * cosB;
    const coshIm = sinhA * sinB;
    
    // sech = 1 / cosh = conjugate(cosh) / |cosh|^2
    const denom = coshRe * coshRe + coshIm * coshIm;
    const expectedRe = coshRe / denom;
    const expectedIm = -coshIm / denom;
    
    const result = new Complex(a, b).sech();
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});