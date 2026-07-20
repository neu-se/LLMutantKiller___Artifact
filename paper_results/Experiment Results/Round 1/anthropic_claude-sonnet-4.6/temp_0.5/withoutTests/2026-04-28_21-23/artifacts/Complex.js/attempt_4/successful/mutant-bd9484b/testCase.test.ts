import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("acosh(0) should equal i*pi/2", () => {
    // acos(0) = PI/2 (real), so res.im = 0 exactly since t2.re = logHypot(1, 0) = log(1) = 0
    // For a=0, b=0: t1 = sqrt(1, 0) = (1, 0), t2 = log(1, 0) = (0, 0)
    // acos(0) = Complex(PI/2 - 0, 0) = (PI/2, 0)
    // res.im = 0
    // Original: 0 <= 0 -> true -> re = -0 = 0, im = PI/2
    // Mutated: 0 < 0 -> false -> re = 0, im = -PI/2
    const result = new Complex(0, 0).acosh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});