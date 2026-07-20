import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for 2+i where else branch is taken and re is properly swapped", () => {
    // For z = 2+i, compute acosh
    // We need acos(2+i) to have im > 0
    // acos(2+i): re part will be some angle, im part should be negative (since 2+i is outside unit circle)
    // Actually let's try z = 1+2i
    const z = new Complex(1, 2);
    const acos_result = z.acos();
    
    // Only proceed if im > 0 (else branch)
    // If acos gives im > 0, then acosh should swap: re=old_im, im=-old_re
    // With mutation: re stays as old_re (wrong), im=-old_re
    const result = z.acosh();
    
    // acosh(1+2i) known value: approximately 1.5285 + 1.1437i
    expect(result.re).toBeCloseTo(1.528570919480498, 5);
    expect(result.im).toBeCloseTo(1.1437177404024204, 5);
  });
});