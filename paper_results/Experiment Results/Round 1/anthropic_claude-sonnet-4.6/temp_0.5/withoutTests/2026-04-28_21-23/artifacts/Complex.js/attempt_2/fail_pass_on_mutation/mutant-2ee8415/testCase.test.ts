import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a complex number where the else branch is taken", () => {
    // Use a value where acos() produces im > 0, triggering the else branch
    // acosh(0) = i*pi/2, so re=0, im=pi/2
    // For z = 0+0i: acos(0) = pi/2 + 0i, im=0, so if branch taken
    // Try z = 0+1i: acos(i) should have im > 0 triggering else branch
    const z = new Complex(0, 1);
    const result = z.acosh();
    
    // acosh(i) = log(i + sqrt(i^2 - 1)) = log(i + sqrt(-2)) = log(i + i*sqrt(2))
    // = log(i*(1 + sqrt(2))) = ln(1+sqrt(2)) + i*pi/2
    const expectedRe = Math.log(1 + Math.sqrt(2));
    const expectedIm = Math.PI / 2;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});