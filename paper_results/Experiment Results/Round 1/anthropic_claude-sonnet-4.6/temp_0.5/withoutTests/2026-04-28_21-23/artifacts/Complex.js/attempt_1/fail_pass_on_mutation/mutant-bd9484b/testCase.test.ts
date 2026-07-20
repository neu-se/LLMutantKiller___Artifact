import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a real number between 0 and 1", () => {
    // acosh(0.5): acos(0.5) returns ~1.0472 + 0i (im === 0)
    // Original (im <= 0): takes first branch -> re = -im = 0, im = re = PI/3
    // Mutated (im < 0): takes second branch -> re = im = 0, im = -re = -PI/3
    const result = new Complex(0.5, 0).acosh();
    // acosh(0.5) should have positive imaginary part (= acos(0.5) = PI/3 ≈ 1.0472)
    expect(result.im).toBeGreaterThan(0);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.acos(0.5), 10);
  });
});