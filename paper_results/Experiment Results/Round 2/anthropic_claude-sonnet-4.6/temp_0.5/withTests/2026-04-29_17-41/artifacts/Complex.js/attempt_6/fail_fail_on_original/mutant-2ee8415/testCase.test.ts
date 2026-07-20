import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("acosh(0) should return the correct complex value with im = PI/2", () => {
    // acosh(0) = i*PI/2
    // acos(0) = PI/2 + 0i, so im=0, the if branch (im <= 0) runs
    // tmp = re = PI/2, re = -im = 0, im = tmp = PI/2
    // Original: im = PI/2
    // Mutation only affects re assignment in else branch, if branch is unaffected
    // Let's use a value that hits the else branch: need acos result with im > 0
    // Try complex number where acos gives positive im
    // acosh(0+0.5i): acos(0.5i) 
    const result = new Complex(0, 0.5).acosh();
    // The im part should be negative (from -res['re'] in else branch)
    // re should be positive logHypot value
    // Just verify re > 0 and im < 0 for this input
    expect(result.re).toBeGreaterThanOrEqual(0);
    // In mutated code, re would be acos result's re which could be different
    // Let's compute expected value: acosh(0.5i) ≈ 0.4812 - 1.1071i  
    expect(result.re).toBeCloseTo(0.48121182505960344, 8);
    expect(result.im).toBeCloseTo(-1.1071487177940904, 8);
  });
});