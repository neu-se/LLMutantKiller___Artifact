import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a complex number with non-zero real and imaginary parts", () => {
    // For acsch, the key computation is d = a * a + b * b
    // The mutation changes this to d = a / a + b * b = 1 + b * b
    // We need a case where a * a != 1, so a != 1 and a != -1
    // Let's use a = 2, b = 1
    // Original: d = 2*2 + 1*1 = 5
    // Mutated:  d = 2/2 + 1*1 = 1 + 1 = 2
    // This will produce different results for the acsch computation
    
    const c = new Complex(2, 1);
    const result = c.acsch();
    
    // Compute expected value manually:
    // acsch(z) = asinh(1/z) = asinh(z_inv)
    // 1/z = (a - bi) / (a^2 + b^2) = (2 - i) / 5 = (0.4, -0.2)
    // Then asinh(0.4 - 0.2i)
    const inv = new Complex(2, 1).inverse();
    const expected = inv.asinh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});