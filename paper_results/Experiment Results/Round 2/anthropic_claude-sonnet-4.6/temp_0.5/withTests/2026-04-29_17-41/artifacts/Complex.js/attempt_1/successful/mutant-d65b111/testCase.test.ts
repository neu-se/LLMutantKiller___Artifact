import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly compute asech for a complex number with non-zero real and imaginary parts", () => {
    // The mutation changes `var d = a * a + b * b` to `var d = a * a + b / b`
    // For a complex number like (1, 2), the original d = 1*1 + 2*2 = 5
    // The mutated d = 1*1 + 2/2 = 2
    // This will produce different results for asech
    const z = new Complex(1, 2);
    const result = z.asech();
    
    // The correct result for asech(1+2i):
    // asech(c) = acosh(1/c)
    // 1/(1+2i) = (1-2i)/5 = 0.2 - 0.4i
    // acosh(0.2 - 0.4i)
    // We compute the expected value using the original formula
    const expected = new Complex(1, 2).inverse().acosh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});