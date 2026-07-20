import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should return correct imaginary part for acoth of a purely imaginary number", () => {
    // For c = 0 + 2i (purely imaginary, a=0, b=2)
    // d = a^2 + b^2 = 4
    // acoth calls atanh(a/d, -b/d) = atanh(0, -0.5)
    // atanh(0 - 0.5i) = -0.5i * atanh_real... 
    // acoth(2i) = atanh(1/(2i)) = atanh(-i/2)
    // atanh(-i/2): re=0, im=-0.5
    // result should have re=0, im = -atan(0.5) ≈ -0.4636476090008257
    // With mutation: atanh(0, +0.5) => im = +atan(0.5) ≈ +0.4636476090008257
    
    const c = new Complex(0, 2);
    const result = c.acoth();
    
    // acoth(2i) = atanh(1/(2i)) = atanh(-i/2)
    // atanh(iy) = i*atan(y), so atanh(-i/2) = -i*atan(1/2)
    const expected_im = -Math.atan(0.5);
    
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(expected_im, 10);
  });
});