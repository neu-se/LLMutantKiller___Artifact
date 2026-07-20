import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for complex number with negative imaginary part", () => {
    // For z with negative imaginary part, acos(z).im should be positive
    // triggering the else branch where mutation occurs
    const c = new Complex(0, -1);
    const acos = c.acos();
    
    const result = c.acosh();
    
    // acosh(z) via identity: cosh(acosh(z)) = z
    // But more directly: check result matches known value
    // acosh(-i) = acosh(0-i): use conjugate symmetry acosh(conj(z)) = conj(acosh(z))
    // acosh(i) has re=log(1+sqrt(2)), im=pi/2 (positive)
    // so acosh(-i) should have re=log(1+sqrt(2)), im=-pi/2
    const expectedRe = Math.log(1 + Math.sqrt(2));
    const expectedIm = -Math.PI / 2;
    
    expect(acos.im).toBeGreaterThan(0); // verify else branch
    expect(result.re).toBeCloseTo(expectedRe, 8);
    expect(result.im).toBeCloseTo(expectedIm, 8);
  });
});