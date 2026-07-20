import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("detects mutation in acosh else branch by checking re value", () => {
    // Try z = -i*2 where acos should give im > 0
    // acos(-2i): need to find input where acos returns im > 0
    // Try a value with negative imaginary part
    const z = new Complex(0, -2);
    
    // acos(0-2i): t1 = sqrt(1 - (0-2i)^2) = sqrt(1+4) ... wait
    // Let's just check the result of acosh directly
    // acosh(0-2i) should be computable
    const result = z.acosh();
    
    // Verify using the identity: acosh(z) = log(z + sqrt(z^2-1))
    // z = -2i, z^2 = -4, z^2-1 = -5
    // sqrt(-5) = i*sqrt(5)
    // z + sqrt(z^2-1) = -2i + i*sqrt(5) = i*(sqrt(5)-2)
    // log(i*(sqrt(5)-2)) = log(sqrt(5)-2) + i*pi/2
    const expectedRe = Math.log(Math.sqrt(5) - 2);
    const expectedIm = Math.PI / 2;
    
    expect(result.re).toBeCloseTo(expectedRe, 8);
    expect(result.im).toBeCloseTo(expectedIm, 8);
  });
});