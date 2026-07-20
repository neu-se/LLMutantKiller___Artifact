import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a complex number with both real and imaginary parts", () => {
    // For z = 1 + i, acsch(z) should return a finite complex number
    // With the mutation (d === 0 instead of d !== 0), when d != 0 it takes the wrong branch
    // producing Infinity instead of the correct result
    const z = new Complex(1, 1);
    const result = z.acsch();

    // The correct value of acsch(1+i) is a finite complex number
    // acsch(z) = asinh(1/z) = asinh((a-bi)/(a^2+b^2))
    // For z = 1+i: 1/z = (1-i)/2 = 0.5 - 0.5i
    // asinh(0.5 - 0.5i) ≈ 0.5306375... - 0.4522784...i
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(result.re).toBeCloseTo(0.5306375309525178, 10);
    expect(result.im).toBeCloseTo(-0.45227844715119064, 10);
  });
});