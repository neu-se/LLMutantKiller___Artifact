import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should compute acsch of a purely imaginary number with negative imaginary part correctly", () => {
    // acsch(bi) where b != 0
    // For z = 0 + 0i (d=0 case), both mutations give same result
    // Test normal path: acsch(i) = -i * pi/2 approximately
    // acsch(0 + 1i): d = 0 + 1 = 1 != 0, so uses (a/d, -b/d).asinh() = (0, -1).asinh()
    // asinh(0 - i) = -i * asin(i * (0-i)) = -i * asin(1) = -i * pi/2
    // So acsch(i) should have im = -pi/2
    
    // Let's test acsch with a small imaginary value to verify sign
    // Use z = 0 + 2i: d = 4, (a/d, -b/d) = (0, -0.5)
    // asinh(0 - 0.5i): swap re/im -> (-0, 0), asin(0 + 0i) = 0, swap back -> 0
    // Actually let's just verify the result numerically
    
    const z = new Complex(0, 2);
    const result = z.acsch();
    
    // acsch(2i) = asinh(1/(2i)) = asinh(-i/2)
    // asinh(-i/2) = log(-i/2 + sqrt(1 - 1/4)) = log(-i/2 + sqrt(3/4))
    // = log(sqrt(3)/2 - i/2) = log(1 * e^(-i*pi/6)) = -i*pi/6
    // So re = 0, im = -pi/6
    
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 6, 10);
  });
});