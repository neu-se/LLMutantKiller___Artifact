import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute sech of a purely imaginary number", () => {
    // sech(0 + i*pi/3) should equal 1/cos(pi/3) = 2
    // because sech(ib) = 1/cosh(ib) = 1/cos(b)
    const c = new Complex(0, Math.PI / 3);
    const result = c.sech();
    
    // sech(i*pi/3) = 2*cosh(0)*cos(pi/3) / (cos(2*pi/3) + cosh(0))
    // = 2*1*(0.5) / (-0.5 + 1) = 1 / 0.5 = 2
    // With mutation b=undefined: d = cos(NaN) + cosh(0) = NaN, result is NaN
    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});