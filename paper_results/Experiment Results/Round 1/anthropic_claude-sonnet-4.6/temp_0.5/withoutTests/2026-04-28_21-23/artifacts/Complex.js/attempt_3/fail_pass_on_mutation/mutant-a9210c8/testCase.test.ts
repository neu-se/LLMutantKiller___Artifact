import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should compute correct imaginary part for sech(0 + i*pi/4)", () => {
    // sech(0 + i*b) = 1/cos(b), which is real when a=0
    // With a=0, b=pi/4: sech = 1/cos(pi/4) = sqrt(2), im = 0
    // With mutation b=undefined: d = cos(2*undefined) + cosh(0) = NaN + 1 = NaN
    const z = new Complex(0, Math.PI / 4);
    const result = z.sech();
    
    const expected = 1 / Math.cos(Math.PI / 4); // sqrt(2)
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});