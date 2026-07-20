import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return correct acosh for a value where acos imaginary part is exactly zero", () => {
    // For acosh(2): acos(2) gives re=0, im = -log(2+sqrt(3)) < 0
    // Both branches agree when im < 0.
    // For acosh(0): acos(0) = pi/2 + 0i, res.im = 0
    // Original (im <= 0): true → re = -res.im = 0, im = res.re = pi/2
    // Mutated  (im < 0):  false → re = res.im = 0, im = -res.re = -pi/2
    const result = new Complex(0, 0).acosh();
    // acosh(0) = i*pi/2, so im should be positive pi/2
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
    expect(result.re).toBeCloseTo(0, 10);
  });
});