import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a purely imaginary number with negative imaginary part", () => {
    // acsch(i) = acsch(0 + 1i)
    // For z = i: acsch(i) = log(i + sqrt(1 + i^2)) = log(i + sqrt(0)) = log(i) = i*pi/2
    // Actually acsch(2i) should give a specific result
    // Let's use z = 0 + 2i: acsch(2i)
    // d = 0 + 4 != 0, so we compute (0/4, -2/4).asinh() = (0, -0.5).asinh()
    const z = new Complex(0, 2);
    const result = z.acsch();
    
    // acsch(2i) = asinh(1/(2i)) = asinh(-i/2)
    // asinh(-i/2) = -i * asin(1/2) = -i * pi/6
    const expected = new Complex(0, -Math.PI / 6);
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});