import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch with imaginary component", () => {
  it("should correctly compute acsch for a complex number with both real and imaginary parts", () => {
    // For a complex number z = a + bi where b != 0,
    // acsch uses d = a*a + b*b (original) vs d = a*a - b*b (mutated)
    // We choose a = 1, b = 2 so that:
    // original: d = 1 + 4 = 5
    // mutated:  d = 1 - 4 = -3
    // This will produce different results for the real and imaginary parts

    const z = new Complex(1, 2);
    const result = z.acsch();

    // Compute expected value manually:
    // acsch(z) = asinh(1/z)
    // 1/z = (a - bi) / (a^2 + b^2) = (1 - 2i) / 5 = 0.2 - 0.4i
    // Then asinh(0.2 - 0.4i)
    const oneOverZ = new Complex(1 / 5, -2 / 5);
    const expected = oneOverZ.asinh();

    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});