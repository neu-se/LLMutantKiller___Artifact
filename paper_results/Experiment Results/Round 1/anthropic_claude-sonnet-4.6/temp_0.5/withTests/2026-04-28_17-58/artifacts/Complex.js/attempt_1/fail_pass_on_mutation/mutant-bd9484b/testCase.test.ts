import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a real number less than 1, where acos imaginary part is zero", () => {
    // acosh(0.5): acos(0.5) = pi/3 + 0i, so res.im === 0
    // Original: res.im <= 0 → true → re = -res.im = 0, im = res.re = pi/3 (positive)
    // Mutated:  res.im < 0  → false → re = res.im = 0, im = -res.re = -pi/3 (negative)
    const result = new Complex(0.5, 0).acosh();
    // The imaginary part should be positive (pi/3 ≈ 1.047)
    expect(result.im).toBeGreaterThan(0);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 3, 10);
  });
});