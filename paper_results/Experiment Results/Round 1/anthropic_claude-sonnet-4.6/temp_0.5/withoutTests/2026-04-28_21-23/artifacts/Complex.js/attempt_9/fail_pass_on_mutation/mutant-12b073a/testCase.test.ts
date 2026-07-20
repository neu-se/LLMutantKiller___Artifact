import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh method for real input", () => {
  it("should correctly compute sinh(2) for real complex number 2+0i", () => {
    const c = new Complex(2, 0);
    const result = c.sinh();
    // sinh(2+0i) = sinh(2)*cos(0) + i*cosh(2)*sin(0) = sinh(2) + 0i
    expect(result.re).toBeCloseTo(Math.sinh(2), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});