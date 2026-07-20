import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should correctly compute acsc for a complex number with both real and imaginary parts", () => {
    // acsc(z) = asin(1/z) where 1/z = (a - bi) / (a^2 + b^2)
    // For z = 2 + i: a=2, b=1
    // Original: d = a*a + b*b = 4 + 1 = 5, so 1/z = (2/5) - (1/5)i = 0.4 - 0.2i
    // Mutated:  d = a/a + b*b = 1 + 1 = 2, so result uses (2/2) - (1/2)i = 1 - 0.5i
    // These produce different asin results
    const z = new Complex(2, 1);
    const result = z.acsc();

    // Compute expected value: acsc(2+i) = asin(1/(2+i)) = asin((2-i)/5) = asin(0.4 - 0.2i)
    // We can verify by computing asin(0.4 - 0.2i) directly
    const expected = new Complex(0.4, -0.2).asin();

    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});