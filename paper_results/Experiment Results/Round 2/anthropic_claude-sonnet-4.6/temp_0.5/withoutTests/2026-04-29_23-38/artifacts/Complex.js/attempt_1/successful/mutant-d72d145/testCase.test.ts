import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should correctly compute acsc for a complex number with non-zero real part", () => {
    // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))
    // The mutation changes `var d = a * a + b * b` to `var d = a / a + b * b`
    // For a = 2, b = 1: original d = 4 + 1 = 5, mutated d = 1 + 1 = 2
    // This will produce different results for the asin computation
    const c = new Complex(2, 1);
    const result = c.acsc();
    
    // The expected value can be computed as asin(1/z)
    // 1/(2+i) = (2-i)/5 = 0.4 - 0.2i
    // asin(0.4 - 0.2i)
    const expected = new Complex(2 / 5, -1 / 5).asin();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});