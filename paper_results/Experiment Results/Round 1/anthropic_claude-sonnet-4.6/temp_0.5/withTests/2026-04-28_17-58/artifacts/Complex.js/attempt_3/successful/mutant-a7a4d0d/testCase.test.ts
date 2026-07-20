import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("acosh", () => {
  it("acosh(0 - 2i) should have correct real and imaginary parts", () => {
    const result = new Complex(0, -2).acosh();
    // With original code (else branch): re = im_old, im = -re_old
    // acos(0-2i) gives re=pi/2, im=log(sqrt(5)+2) > 0
    // else branch: re = log(sqrt(5)+2), im = -pi/2
    // With mutation (if branch): re = -im_old, im = re_old
    // if branch: re = -log(sqrt(5)+2), im = pi/2
    expect(result.re).toBeCloseTo(Math.log(Math.sqrt(5) + 2), 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});