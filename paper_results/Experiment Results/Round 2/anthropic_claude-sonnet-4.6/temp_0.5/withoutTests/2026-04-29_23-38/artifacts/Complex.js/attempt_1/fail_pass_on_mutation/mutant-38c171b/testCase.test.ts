import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a purely imaginary number with non-zero imaginary part", () => {
    // For acsch(bi) where b != 0, d = 0 + b*b != 0, so it goes through the normal path
    // Let's test with a = 0, b = 2: d = 4 != 0
    // acsch(2i) = asinh(1/(2i)) = asinh(-i/2)
    // The result should have specific re and im values
    
    // Test with a = 0, b = 1 (purely imaginary)
    // acsch(i) = log(i + sqrt(1 - 1)) = log(i) = i*pi/2
    const result = new Complex(0, 1).acsch();
    
    // acsch(i) = -i * pi/2
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});