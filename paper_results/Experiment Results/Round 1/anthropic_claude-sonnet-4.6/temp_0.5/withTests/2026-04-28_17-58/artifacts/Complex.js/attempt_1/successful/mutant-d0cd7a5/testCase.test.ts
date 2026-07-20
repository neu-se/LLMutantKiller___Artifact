import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a complex number with non-zero imaginary part", () => {
    // acsch(1 + i) should use -b/d in the intermediate calculation
    // Original uses new Complex(a/d, -b/d).asinh()
    // Mutated uses new Complex(a/d, +b/d).asinh()
    // For z = 1 + i: a=1, b=1, d=2
    // Original intermediate: Complex(0.5, -0.5).asinh()
    // Mutated intermediate: Complex(0.5, 0.5).asinh()
    const z = new Complex(1, 1);
    const result = z.acsch();

    // The correct value of acsch(1+i) can be verified:
    // acsch(z) = log((1 + sqrt(1 + z^2)) / z)
    // z^2 = (1+i)^2 = 2i
    // 1 + z^2 = 1 + 2i
    // sqrt(1+2i) ≈ 1.272 + 0.786i
    // 1 + sqrt(1+2i) ≈ 2.272 + 0.786i
    // (2.272 + 0.786i) / (1+i) ≈ 1.529 - 0.743i
    // log(1.529 - 0.743i) ≈ 0.529 - 0.451i (approximately)
    
    // The imaginary part should be negative for acsch(1+i)
    // With the mutation, the sign of the imaginary part would be flipped
    
    // Verify using the mathematical identity: acsch(z) = asinh(1/z)
    const oneOverZ = new Complex(1, 0).div(z);
    const expected = oneOverZ.asinh();

    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});