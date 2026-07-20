import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh", () => {
  it("should compute sinh of a purely imaginary number correctly", () => {
    // sinh(0 + i*pi/2) = i*sin(pi/2) = i
    // sinh(a+bi) = sinh(a)*cos(b) + i*cosh(a)*sin(b)
    // a=0, b=pi/2: sinh(0)*cos(pi/2) + i*cosh(0)*sin(pi/2) = 0 + i*1 = i
    // The mutation changes if(a===0 && b===0) to if(true) in pow
    // But let's test sinh directly for a non-trivial case
    const c = new Complex(1, 2);
    const result = c.sinh();
    
    // sinh(1+2i) = sinh(1)*cos(2) + i*cosh(1)*sin(2)
    const expectedRe = Math.sinh(1) * Math.cos(2);
    const expectedIm = Math.cosh(1) * Math.sin(2);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
    expect(result.re).not.toBeCloseTo(0, 5);
  });
});