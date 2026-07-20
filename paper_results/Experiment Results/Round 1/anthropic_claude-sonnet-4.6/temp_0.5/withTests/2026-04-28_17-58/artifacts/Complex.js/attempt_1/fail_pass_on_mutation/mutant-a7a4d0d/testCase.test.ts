import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("acosh mutation detection", () => {
  it("should correctly compute acosh for a negative real number where acos result has positive imaginary part", () => {
    // acosh(-2) should equal log(-2 + sqrt(4-1)) = log(-2 + sqrt(3))
    // which is a complex number with imaginary part = PI
    const result = new Complex(-2, 0).acosh();
    
    // acosh(-2) = log(-2 + sqrt(3)) ... actually acosh(-2) = log(-2 + i*sqrt(3))
    // = ln(sqrt((-2)^2 + (sqrt(3))^2)) + i*atan2(sqrt(3), -2)
    // = ln(sqrt(4+3)) + i*atan2(sqrt(3), -2)
    // = ln(sqrt(7)) + i*(pi - atan(sqrt(3)/2))
    // The real part should be positive, imaginary part should be PI (approximately)
    
    // The key: imaginary part should be Math.PI (positive), not negative
    expect(result.im).toBeCloseTo(Math.PI, 10);
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(3)), 10);
  });
});