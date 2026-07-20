import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should correctly compute acsc for a complex number with non-zero real and imaginary parts", () => {
    // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))
    // The mutation changes `var d = a * a + b * b` to `var d = a / a + b * b`
    // For a = 2, b = 1: original d = 4 + 1 = 5, mutated d = 1 + 1 = 2
    // This will produce different results for the asin computation

    const c = new Complex(2, 1);
    const result = c.acsc();

    // The correct value of acsc(2 + i) can be computed as asin(1/(2+i))
    // 1/(2+i) = (2-i)/5 = 0.4 - 0.2i
    // asin(0.4 - 0.2i) should give a specific value
    
    // With original code: d = 2*2 + 1*1 = 5, so a/d = 2/5 = 0.4, -b/d = -1/5 = -0.2
    // With mutated code: d = 2/2 + 1*1 = 2, so a/d = 2/2 = 1, -b/d = -1/2 = -0.5
    
    // Compute expected value using asin(0.4 - 0.2i)
    const expected = new Complex(0.4, -0.2).asin();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});