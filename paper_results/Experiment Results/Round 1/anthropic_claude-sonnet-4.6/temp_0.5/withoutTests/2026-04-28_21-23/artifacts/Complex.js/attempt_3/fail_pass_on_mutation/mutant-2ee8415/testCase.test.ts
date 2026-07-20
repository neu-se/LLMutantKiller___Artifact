import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a negative real number triggering the else branch", () => {
    // acosh(-2): acos(-2) will have im > 0, triggering the else branch
    // acosh(-2) = i * pi - acosh(2) ... let's verify numerically
    // acos(-2) has im > 0 since -2 < -1
    const z = new Complex(-2, 0);
    const result = z.acosh();
    
    // acosh(-2) = pi*i - acosh(2) = pi*i - log(2+sqrt(3))
    // So re = -log(2+sqrt(3)), im = pi ... but actually:
    // acosh(-2) = log(-2 + sqrt(4-1)) ... 
    // Standard: acosh(-2) = log(2+sqrt(3)) + i*pi ... re should be positive
    const expectedRe = Math.log(2 + Math.sqrt(3));
    const expectedIm = Math.PI;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});