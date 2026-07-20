import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("detects mutation in acosh else branch - im value should be correct", () => {
    // acosh(0-2i): original gives re=1.4436, im=pi/2
    // If else branch is taken: re=old_im_acos, im=-old_re_acos
    // With mutation: re=old_re_acos (wrong), im=-old_re_acos (same)
    // So im should differ between original and mutated if old_re_acos != -pi/2
    const z = new Complex(0, -2);
    const result = z.acosh();
    
    // Original result has im = pi/2
    expect(result.im).toBeCloseTo(Math.PI / 2, 8);
    // Original result has re = 1.4436354751788103
    expect(result.re).toBeCloseTo(1.4436354751788103, 8);
  });
});