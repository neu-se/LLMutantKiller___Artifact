import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch of a pure imaginary number with non-zero imaginary part", () => {
    // For z = 0 + 2i, acsch(z) should be computed via the d !== 0 branch
    // acsch(2i) = asinh(1/(2i)) = asinh(-i/2)
    const z = new Complex(0, 2);
    const result = z.acsch();
    
    // acsch(2i) = log(i/2 + sqrt(1 - 1/4)) = log(i/2 + sqrt(3/4))
    // The imaginary part should be non-zero and specific
    // Using the formula: acsch(bi) = -i * arcsin(1/b) for real b
    // acsch(2i) = -i * arcsin(1/2) = -i * pi/6
    const expected = new Complex(0, -Math.PI / 6);
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});