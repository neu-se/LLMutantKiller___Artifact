import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should correctly compute asinh for a purely imaginary number", () => {
    // asinh(0 + 2i) should equal i * asin(2) = i * (pi/2 - i*log(2 + sqrt(3)))
    // = log(2 + sqrt(3)) + i*pi/2
    // approximately 1.3169578969248166 + 1.5707963267948966i
    const c = new Complex(0, 2);
    const result = c.asinh();
    
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});